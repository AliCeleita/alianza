import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToolbarService} from "../../service/toolbar.service";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface Menu {
  path: string
  icon: IconProp
}

interface Attributes{
  attribute: string
  name: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  menuOptions: Menu[] = [
    {path: '/home/clients', icon: 'user'},
  ];

  attributeOptions: Attributes[] = [
    {attribute: 'sharedKey',name: 'Shared Key'},
    {attribute: 'businessID',name: 'Business ID'},
    {attribute: 'email',name: 'E-mail'},
  ];

  constructor(public toolbar: ToolbarService) {

  }

  onNew() {
    this.toolbar.onNew.emit();
  }
}
