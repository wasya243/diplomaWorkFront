import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormValidationComponent } from './form-validation/form-validation.component';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  declarations: [
    FormValidationComponent,
    HeaderComponent,
    NavigationBarComponent
  ],
  exports: [
    FormValidationComponent,
    NavigationBarComponent,
    HeaderComponent,
    FontAwesomeModule
  ]
})
export class SharedModule {
}
