import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormValidationComponent } from './form-validation/form-validation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormValidationComponent
  ],
  exports: [
    FormValidationComponent
  ]
})
export class SharedModule {
}
