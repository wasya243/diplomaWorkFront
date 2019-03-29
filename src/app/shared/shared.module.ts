import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormValidationComponent } from './form-validation/form-validation.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    FormValidationComponent,
    HeaderComponent
  ],
  exports: [
    FormValidationComponent,
    HeaderComponent,
    FontAwesomeModule
  ]
})
export class SharedModule {
}
