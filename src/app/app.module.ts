import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './components/table/table.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AppRoutingModule } from './app-routing.module';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, DecimalPipe, NgOptimizedImage} from "@angular/common";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ClientFormModalComponent } from './components/client-form-modal/client-form-modal.component';
import {ClientService} from "./service/api/client.service";
import {ToolbarService} from "./service/toolbar.service";
import {AlertService} from "./service/alert.service";
import {NgxSelectModule} from "ngx-select-ex";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    ClientsComponent,
    ClientFormModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSelectModule,
    NgOptimizedImage
  ],
  providers: [DecimalPipe, ClientService, ToolbarService, AlertService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

}
