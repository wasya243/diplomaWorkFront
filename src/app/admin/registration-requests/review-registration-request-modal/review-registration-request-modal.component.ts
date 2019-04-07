import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';

import IRegistrationRequest = diploma.IRegistrationRequest;

@Component({
  selector: 'app-update-faculty-modal',
  templateUrl: './review-registration-request-modal.component.html',
  styleUrls: [ './review-registration-request-modal.component.scss' ]
})
export class ReviewRegistrationRequestModalComponent implements OnInit {

  @Input() data: IRegistrationRequest;

  registrationRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.registrationRequestForm = this.fb.group({
      firstName: [ { value: this.data.firstName, disabled: true } ],
      lastName: [ { value: this.data.lastName, disabled: true } ],
      email: [ { value: this.data.email, disabled: true } ],
      facultyName: [ { value: this.data.faculty, disabled: true } ]
    });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

}
