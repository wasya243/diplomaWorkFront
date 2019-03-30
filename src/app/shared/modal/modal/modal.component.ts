import { Component, ContentChild, ElementRef, Input, TemplateRef } from '@angular/core';

import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ]
})
export class ModalComponent {
  @ContentChild('content') content: TemplateRef<ElementRef>;
  @Input() title = 'Default title';
  @Input() successBtnText = 'Ok';
  @Input() rejectBtnText = 'Cancel';

  constructor(private modalService: ModalService) {
  }

  dismiss() {
    this.modalService.dismiss();
  }

  apply() {
    this.modalService.apply();
  }
}
