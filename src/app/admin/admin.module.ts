import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users/users.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersService } from './users/users.service';
import { FacultiesService } from './faculties/faculties.service';
import { ClassroomsService } from './classrooms/classrooms.service';
import { UpdateUserModalComponent } from './users/update-user-modal/update-user-modal.component';
import { DeleteUserModalComponent } from './users/delete-user-modal/delete-user-modal.component';
import { ResetPasswordModalComponent } from './users/reset-password-modal/reset-password-modal.component';
import { DeleteFacultyModalComponent } from './faculties/delete-faculty-modal/delete-faculty-modal.component';
import { UpdateFacultyModalComponent } from './faculties/update-faculty-modal/update-faculty-modal.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { DeleteClassroomModalComponent } from './classrooms/delete-classroom-modal/delete-classroom-modal.component';
import { CreateFacultyModalComponent } from './faculties/create-faculty-modal/create-faculty-modal.component';
import { UpdateClassroomModalComponent } from './classrooms/update-classroom-modal/update-classroom-modal.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    UsersComponent,
    FacultiesComponent,
    AdminContainerComponent,
    UpdateUserModalComponent,
    DeleteUserModalComponent,
    ResetPasswordModalComponent,
    DeleteFacultyModalComponent,
    UpdateFacultyModalComponent,
    ClassroomsComponent,
    DeleteClassroomModalComponent,
    CreateFacultyModalComponent,
    UpdateClassroomModalComponent ],
  entryComponents: [
    UpdateUserModalComponent,
    DeleteUserModalComponent,
    ResetPasswordModalComponent,
    DeleteFacultyModalComponent,
    UpdateFacultyModalComponent,
    DeleteClassroomModalComponent,
    CreateFacultyModalComponent,
    UpdateClassroomModalComponent
  ],
  providers: [ UsersService, FacultiesService, ClassroomsService ],
  exports: []
})
export class AdminModule {
}
