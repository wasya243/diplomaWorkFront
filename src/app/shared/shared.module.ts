import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormValidationComponent } from './form-validation/form-validation.component';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { GridModule } from './grid/grid.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    GridModule,
    RouterModule
  ],
  declarations: [
    FormValidationComponent,
    HeaderComponent,
    NavigationBarComponent
  ],
  exports: [
    FormValidationComponent,
    GridModule,
    NavigationBarComponent,
    HeaderComponent,
    FontAwesomeModule
  ]
})
export class SharedModule {
}