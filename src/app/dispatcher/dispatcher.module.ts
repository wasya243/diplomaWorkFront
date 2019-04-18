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
import { AssignmentsService } from './assign-classes/assignments.service';
import { ReportsService } from './reports/reports.service';
import { ReviewRequestModalComponent } from './requests/review-request-modal/review-request-modal.component';
import { ApproveRequestModalComponent } from './requests/approve-request-modal/approve-request-modal.component';
import { CreateRequestModalComponent } from './requests/create-request-modal/create-request-modal.component';
import { ReportsComponent } from './reports/reports.component';
import { GenerateReportModalComponent } from './reports/generate-report-modal/generate-report-modal.component';
import { ReportTableComponent } from './reports/report-table/report-table.component';
import { AssignmentsTableComponent } from './assignments-table/assignments-table.component';
import { WeekBarItemComponent } from './week-bar-item/week-bar-item.component';
import { WeeksService } from './assign-classes/weeks.service';
import { CreateAssignmentModalComponent } from './assign-classes/create-assignment-modal/create-assignment-modal.component';
import { AssignmentContextmenuComponent } from './assignments-table/assignment-contextmenu/assignment-contextmenu.component';

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
    ApproveRequestModalComponent,
    CreateRequestModalComponent,
    ReportsComponent,
    GenerateReportModalComponent,
    ReportTableComponent,
    AssignmentsTableComponent,
    WeekBarItemComponent,
    CreateAssignmentModalComponent,
    AssignmentContextmenuComponent
  ],
  entryComponents: [
    ReviewRequestModalComponent,
    ApproveRequestModalComponent,
    CreateRequestModalComponent,
    GenerateReportModalComponent,
    CreateAssignmentModalComponent
  ],
  providers: [
    RequestsService,
    ReportsService,
    AssignmentsService,
    WeeksService
  ],
  exports: []
})
export class DispatcherModule {
}
