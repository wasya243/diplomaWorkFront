import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertService } from './alert.service';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertComponent
  ],
  exports: [
    AlertComponent
  ],
  providers: [
    AlertService
  ]
})
export class AlertModule {
}

