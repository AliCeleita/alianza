import {EventEmitter, Injectable, Input, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";

@Injectable({providedIn: 'root'})
export class ToolbarService {

  onNew: EventEmitter<void> = new EventEmitter();

  private searchCtrl: FormControl;
  private attributeCtrl: FormControl;

  constructor() {
    this.searchCtrl = new FormControl();
    this.attributeCtrl = new FormControl('sharedKey');
  }

  set searchText(value: string) {
    this.searchCtrl.setValue(value);
  }

  get searchText() {
    return this.searchCtrl.value;
  }

  set attributeText(value: string) {
    this.attributeCtrl.setValue(value);
  }

  get attributeText(){
    return this.attributeCtrl.value;
  }

  get combinedChanges$(): Observable<{ searchText: string; attributeText: string }> {
    return combineLatest([
      this.searchCtrl.valueChanges.pipe(
        startWith(this.searchCtrl.value),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.attributeCtrl.valueChanges.pipe(
        startWith(this.attributeCtrl.value),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([searchText, attributeText]) => ({ searchText, attributeText }))
    );
  }
}
