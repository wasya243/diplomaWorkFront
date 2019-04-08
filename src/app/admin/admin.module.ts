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
import { RegistrationRequestsService } from './registration-requests/registration-requests.service';
import { UpdateUserModalComponent } from './users/update-user-modal/update-user-modal.component';
import { DeleteUserModalComponent } from './users/delete-user-modal/delete-user-modal.component';
import { ResetPasswordModalComponent } from './users/reset-password-modal/reset-password-modal.component';
import { DeleteFacultyModalComponent } from './faculties/delete-faculty-modal/delete-faculty-modal.component';
import { UpdateFacultyModalComponent } from './faculties/update-faculty-modal/update-faculty-modal.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { DeleteClassroomModalComponent } from './classrooms/delete-classroom-modal/delete-classroom-modal.component';
import { CreateFacultyModalComponent } from './faculties/create-faculty-modal/create-faculty-modal.component';
import { UpdateClassroomModalComponent } from './classrooms/update-classroom-modal/update-classroom-modal.component';
import { CreateClassroomModalComponent } from './classrooms/create-classroom-modal/create-classroom-modal.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { ReviewRegistrationRequestModalComponent } from './registration-requests/review-registration-request-modal/review-registration-request-modal.component';
import { PermitRegistrationRequestComponent } from './registration-requests/permit-registration-request/permit-registration-request.component';

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
    UpdateClassroomModalComponent,
    CreateClassroomModalComponent,
    RegistrationRequestsComponent,
    ReviewRegistrationRequestModalComponent,
    PermitRegistrationRequestComponent ],
  entryComponents: [
    UpdateUserModalComponent,
    DeleteUserModalComponent,
    ResetPasswordModalComponent,
    DeleteFacultyModalComponent,
    UpdateFacultyModalComponent,
    DeleteClassroomModalComponent,
    CreateFacultyModalComponent,
    UpdateClassroomModalComponent,
    CreateClassroomModalComponent,
    ReviewRegistrationRequestModalComponent,
    PermitRegistrationRequestComponent
  ],
  providers: [ UsersService, RegistrationRequestsService ],
  exports: []
})
export class AdminModule {
}
