import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(msg: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Ok!',
      text: msg,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  error(msg: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
}
