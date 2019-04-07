import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { AdminContainerComponent } from './admin-container/admin-container.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { UsersComponent } from './users/users.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { MasterGuard } from '../auth/master-guard.service';
import { AuthService } from '../auth/auth.service';

const superAdminRoutes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    canActivate: [ MasterGuard ],
    data: {
      roles: [ AuthService.userRoles.ADMIN ]
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'faculties',
        component: FacultiesComponent
      },
      {
        path: 'classrooms',
        component: ClassroomsComponent
      },
      {
        path: 'requests',
        component: RegistrationRequestsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(superAdminRoutes),
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
