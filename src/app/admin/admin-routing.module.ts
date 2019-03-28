import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { AdminContainerComponent } from './admin-container/admin-container.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { UsersComponent } from './users/users.component';
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
