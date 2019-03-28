import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersComponent } from './users/users.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ UsersComponent, FacultiesComponent, AdminContainerComponent ],
  providers: [],
  exports: []
})
export class AdminModule {
}
