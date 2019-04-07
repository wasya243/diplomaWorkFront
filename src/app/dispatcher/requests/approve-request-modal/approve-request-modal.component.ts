import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from '../../../shared/modal/modal.service';
import { RequestsService } from '../requests.service';

import IRequest = diploma.IRequest;

@Component({
  selector: 'app-delete-faculty-modal',
  templateUrl: './approve-request-modal.component.html',
  styleUrls: [ './approve-request-modal.component.scss' ]
})
export class ApproveRequestModalComponent implements OnInit {

  @Input() data: IRequest;

  constructor(
    private modalService: ModalService,
    private requestsService: RequestsService
  ) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const requestId = this.data.id;
    this.requestsService.approveRequest(requestId, true)
      .subscribe(() => {
        this.modalService.apply(requestId);
      }, (error) => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
