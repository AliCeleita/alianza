import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbDateStruct, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Client} from "../../models/client.model";

@Component({
  selector: 'app-client-form-modal',
  templateUrl: './client-form-modal.component.html',
  styleUrls: ['./client-form-modal.component.scss']
})

export class ClientFormModalComponent implements OnInit {

  form: FormGroup;
  isnew: boolean = true;
  minDate: any;

  constructor(private config: NgbModalConfig,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder) {
    this.config.backdrop = 'static';
    this.form = this.fb.group({
      businessID: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      dataFinished: ['', Validators.required],
    });
    const todayDate = new Date();
    this.minDate = {
      year: todayDate.getFullYear(),
      month: todayDate.getMonth() + 1,
      day: todayDate.getDate()
    };
  }



  ngOnInit(): void {
  }

  setFormValue(client: Client) {
    this.isnew = false;

    const [year, month, day] = client.dataFinished.split('-').map(Number);
    let dataFinished = { year, month, day };
    this.form.setValue({
      dataFinished,
      businessID: client.businessID,
      email: client.email,
      phone: client.phone
    });
  }

  save() {
    if (this.form.invalid) return;

    const result: Client = this.form.value;
    const {year, month, day}: NgbDateStruct = this.form.value.dataFinished;
    result.dataFinished = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    this.activeModal.close(result);
  }

  dismiss() {
    this.activeModal.dismiss('Dismiss');
  }
}
