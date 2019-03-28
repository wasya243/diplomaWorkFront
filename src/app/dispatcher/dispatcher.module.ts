import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DispatcherContainerComponent } from './dispatcher-container/dispatcher-container.component';
import { AssignClassesComponent } from './assign-classes/assign-classes.component';
import { DispatcherRoutingModule } from './dispatcher-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DispatcherRoutingModule
  ],
  declarations: [ DispatcherContainerComponent, AssignClassesComponent ],
  providers: [],
  exports: []
})
export class DispatcherModule {
}
