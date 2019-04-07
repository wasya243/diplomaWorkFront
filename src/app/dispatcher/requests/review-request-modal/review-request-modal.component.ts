import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';

import IRequest = diploma.IRequest;

@Component({
  selector: 'app-review-request-modal',
  templateUrl: './review-request-modal.component.html',
  styleUrls: [ './review-request-modal.component.scss' ]
})
export class ReviewRequestModalComponent implements OnInit {

  @Input() data: IRequest;

  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.requestForm = this.fb.group({
      faculty: [ { value: this.data.faculty, disabled: true } ],
      classroom: [ { value: this.data.classroom, disabled: true } ],
      start: [ { value: this.data.start, disabled: true } ],
      end: [ { value: this.data.end, disabled: true } ],
      isApproved: [ { value: this.data.isApproved, disabled: true } ],
      createdAt: [ { value: this.data.createdAt, disabled: true } ]
    });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

}
