import { Component, OnInit } from '@angular/core';

import { GenerateReportModalComponent } from './generate-report-modal/generate-report-modal.component';
import { ReportsService } from './reports.service';
import { ModalService } from '../../shared/modal/modal.service';

import IReport = diploma.IReport;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.scss' ]
})
export class ReportsComponent implements OnInit {

  reports: Array<IReport> = [];
  constructor(
    private reportsService: ReportsService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.reportsService.onInitReportCreationSubject().subscribe(async () => {
      this.modalService.open(GenerateReportModalComponent, { size: 'lg' })
        .then(({ start, end }) => {
          this.getReports(start, end);
        })
        .catch(error => console.error(error));
    });
  }

  private getReports(start: string, end: string) {
    this.reportsService.getReports(start, end).subscribe((reports: Array<IReport>) => {
      this.reports = reports;
    }, error => console.error(error));
  }

}
