import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from './modal.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ModalComponent ],
  providers: [ ModalService ],
  exports: [ ModalComponent ]
})
export class ModalModule {
}
