import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../shared/modal/modal.service';
import { RegistrationRequestsService } from '../registration-requests.service';

import IRegistrationRequest = diploma.IRegistrationRequest;

@Component({
  selector: 'app-delete-faculty-modal',
  templateUrl: './permit-registration-request.component.html',
  styleUrls: [ './permit-registration-request.component.scss' ]
})
export class PermitRegistrationRequestComponent implements OnInit {

  @Input() data: IRegistrationRequest;

  constructor(
    private modalService: ModalService,
    private registrationRequestsService: RegistrationRequestsService
  ) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const requestId = this.data.id;
    this.registrationRequestsService.permitRegistrationRequest(requestId)
      .subscribe(() => {
        this.modalService.apply(requestId);
      }, (error) => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
