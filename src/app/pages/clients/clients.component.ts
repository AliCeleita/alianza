import {Component, QueryList, ViewChildren} from '@angular/core';
import {ToolbarService} from "../../service/toolbar.service";
import {ClientService} from "../../service/api/client.service";
import {Client} from "../../models/client.model";
import {FormControl} from "@angular/forms";
import {NgbdSortableHeaderDirective} from "../../ngbd-sortable-header.directive";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../service/alert.service";
import {debounceTime} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Page} from "../../utils/page";
import {IClientForm} from "../../utils/client.form";
import {ClientFormModalComponent} from "../../components/client-form-modal/client-form-modal.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  clients: Client[] = [];
  total: number = 0;
  loading: boolean = true;
  isLast: boolean = true;

  private _querySearch: string = '';
  private _attributeSearch: string = '';
  _page: number = 0;
  private _pageSize: number = 5;

  searchCtrl: FormControl = new FormControl();
  attributeCtrl: FormControl = new FormControl();

  @ViewChildren(NgbdSortableHeaderDirective) headers!: QueryList<NgbdSortableHeaderDirective>;

  constructor(private clientService: ClientService,
              private modalService: NgbModal,
              private alertService: AlertService,
              public toolbar: ToolbarService) { }

  get querySearch() {
    return this._querySearch;
  }

  get attributeSearch() {
    return this._attributeSearch;
  }

  set page(value: number) {
    this._page = value - 1;
    this.searchClients(this.attributeCtrl.value, this.searchCtrl.value, this._page, this.pageSize);
  }

  set pageSize(value: number) {
    this._pageSize = value;
    this.searchClients(this.attributeCtrl.value, this.searchCtrl.value, this.page-1, this._pageSize);
  }

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  ngOnInit(): void {
    this.searchClients();

    this.toolbar.combinedChanges$.subscribe(({ searchText, attributeText }) => this.searchClients(attributeText, searchText));

    this.toolbar.onNew
      .pipe(debounceTime(500))
      .subscribe(this.onNewClient);
  }

  searchClients(attribute: string = 'sharedKey', query: string = '', page: number = 0, pageSize: number = 5) {
    this.loading = true;
    this.clientService.getClients(attribute || '', query || '', page, pageSize)
      .pipe(
        debounceTime(300)
      )
      .subscribe({
        next: this.OnResult
      })
      .add(() => this.loading = false);
  }

  OnResult = (page: Page<Client>) => {
    this.total = page.totalElements;
    this.clients = page.content;
    this._page = page.number + 1;
    this.isLast = page.last;
  }

  onNewClient = async () => {
    const modalRef = this.modalService.open(ClientFormModalComponent);
    const result: IClientForm = await modalRef.result;

    this.clientService.create(result)
      .subscribe({ next: this.onCreateSuccess, error: this.onError})
  }

  async edit(item: Client) {
    const modalRef = this.modalService.open(ClientFormModalComponent);
    const instance: ClientFormModalComponent = modalRef.componentInstance;
    instance.setFormValue(item);

    modalRef.result.then((result: IClientForm) => {
      this.clientService.update(item.id, result)
        .subscribe({ next: this.onEditSuccess, error: this.onError });
    });

  }

  async delete(item: Client) {
      this.clientService.delete(item.id)
        .subscribe({ next: this.onDeleteSuccess, error: this.onError });
  }

  onEditSuccess = () => {
    console.log('Entro a Edit Success')
    this.alertService.success('Client modified successfully.');
    this.searchClients(this.attributeSearch, this.querySearch, this.page, this.pageSize);
  }

  onDeleteSuccess = () => {
    console.log('Entro a delete Success')
    this.alertService.success('Client deleted successfully.');
    this.searchClients(this.attributeSearch, this.querySearch, this.page, this.pageSize);
  }

  onCreateSuccess = () => {
    console.log('Entro a create Success')
    this.alertService.success('Client created successfully.');
    this.searchClients(this.attributeSearch, this.querySearch, this.page, this.pageSize);
  }

  onError = (error: HttpErrorResponse) => {
    const message = error.error?.message || 'An error occurred.';
    this.alertService.error(message);
  }
}
