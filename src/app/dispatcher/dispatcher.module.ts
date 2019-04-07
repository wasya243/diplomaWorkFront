import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DispatcherContainerComponent } from './dispatcher-container/dispatcher-container.component';
import { AssignClassesComponent } from './assign-classes/assign-classes.component';
import { DispatcherRoutingModule } from './dispatcher-routing.module';
import { RequestsComponent } from './requests/requests.component';
import { RequestsService } from './requests/requests.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DispatcherRoutingModule
  ],
  declarations: [ DispatcherContainerComponent, AssignClassesComponent, RequestsComponent ],
  providers: [ RequestsService ],
  exports: []
})
export class DispatcherModule {
}
