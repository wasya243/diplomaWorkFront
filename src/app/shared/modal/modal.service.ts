import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import IModalConfig = diploma.IModalConfig;

@Injectable()
export class ModalService {
  private defaultConfig: IModalConfig = {
    backdrop: 'static',
    keyboard: false,
    centered: true
  };
  private activeModal: any;
  private data: any;

  constructor(
    private ngbModal: NgbModal
  ) {
  }

  open(content, config: IModalConfig = {}, data?: any) {
    if (this.activeModal) {
      // throw(Error('Modal already opened. Close it before opening another one'));
      this.dismiss();
    }
    const extendedConfig = { ...this.defaultConfig, ...config };
    this.activeModal = this.ngbModal.open(content, extendedConfig);
    // data && (this.activeModal.componentInstance.data = data);
    this.data = data;
    return this.activeModal.result;
  }

  getPassedData() {
    return this.data;
  }

  dismiss(data?) {
    if (!this.activeModal) {
      return;
    }
    this.activeModal.dismiss(data);
    this.activeModal = null;
  }

  apply(data?) {
    this.activeModal.close(data);
    this.activeModal = null;
  }
}
