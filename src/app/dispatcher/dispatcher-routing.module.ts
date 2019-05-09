import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { DispatcherContainerComponent } from './dispatcher-container/dispatcher-container.component';
import { MasterGuard } from '../auth/master-guard.service';
import { AuthService } from '../auth/auth.service';
import { AssignClassesComponent } from './assign-classes/assign-classes.component';
import { RequestsComponent } from './requests/requests.component';
import { ReportsComponent } from './reports/reports.component';
import { GroupsComponent } from './groups/groups.component';

const dispatcherRoutes: Routes = [
  {
    path: '',
    component: DispatcherContainerComponent,
    canActivate: [ MasterGuard ],
    data: {
      roles: [ AuthService.userRoles.DISPATCHER ]
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'assign-classes'
      },
      {
        path: 'requests',
        component: RequestsComponent
      },
      {
        path: 'assign-classes',
        component: AssignClassesComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(dispatcherRoutes),
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class DispatcherRoutingModule {
}
