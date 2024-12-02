import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  hidden?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()
  columns: TableColumn[] = [];

  @Input()
  total: number = 0;

  @Input()
  page: number = 0;

  @Input()
  querySearch?: string;

  @Input()
  attributeSearch?: string;

  @Input()
  pageSize: number = 5;

  @Input()
  data: any[] = [];

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();

  @Output()
  pageSizeChange: EventEmitter<number> = new EventEmitter();

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.pageChange.emit(this.page);
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.pageSizeChange.emit(this.pageSize);
  }


  getValue(key: string, item: any): any {
    const keys = key.split(".");
    const value = keys.reduce((obj, currentKey) => {
      if (obj && obj[currentKey] !== undefined) {
        return obj[currentKey];
      } else {
        return undefined;
      }
    }, item);
    return value;
  }


}
