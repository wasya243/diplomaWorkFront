import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { DispatcherContainerComponent } from './dispatcher-container/dispatcher-container.component';
import { AssignClassesComponent } from './assign-classes/assign-classes.component';
import { DispatcherRoutingModule } from './dispatcher-routing.module';
import { RequestsComponent } from './requests/requests.component';
import { RequestsService } from './requests/requests.service';
import { ReviewRequestModalComponent } from './requests/review-request-modal/review-request-modal.component';
import { ApproveRequestModalComponent } from './requests/approve-request-modal/approve-request-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    DispatcherRoutingModule
  ],
  declarations: [
    DispatcherContainerComponent,
    AssignClassesComponent,
    RequestsComponent,
    ReviewRequestModalComponent,
    ApproveRequestModalComponent
  ],
  entryComponents: [
    ReviewRequestModalComponent,
    ApproveRequestModalComponent
  ],
  providers: [ RequestsService ],
  exports: []
})
export class DispatcherModule {
}
