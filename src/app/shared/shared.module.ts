import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormattingService } from './formatting.service';
import { ClassroomsService } from './classrooms.service';
import { FacultiesService } from './faculties.service';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { GridModule } from './grid/grid.module';
import { ModalModule } from './modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    GridModule,
    RouterModule,
    ModalModule
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
    FontAwesomeModule,
    ModalModule
  ],
  providers: [
    FormattingService,
    FacultiesService,
    ClassroomsService
  ]
})
export class SharedModule {
}
