import { Component, OnInit } from '@angular/core';

import { GenerateReportModalComponent } from './generate-report-modal/generate-report-modal.component';
import { ReportsService } from './reports.service';
import { DoubleLessonsService } from '../../shared/double-lessons.service';
import { ModalService } from '../../shared/modal/modal.service';

import IReport = diploma.IReport;
import IDoubleLesson = diploma.IDoubleLesson;


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.scss' ]
})
export class ReportsComponent implements OnInit {

  reports: Array<IReport> = [];
  doubleLessons: Array<IDoubleLesson> = [];

  constructor(
    private doubleLessonsService: DoubleLessonsService,
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
    this.getDoubleLessons();
  }

  private getReports(start: string, end: string): void {
    this.reportsService.getReports(start, end).subscribe((reports: Array<IReport>) => {
      this.reports = reports;
    }, error => console.error(error));
  }

  private getDoubleLessons(): void {
    this.doubleLessonsService.getDoubleLessons().subscribe((response: Array<IDoubleLesson>) => {
      this.doubleLessons = response;
    }, error => console.error(error));
  }

}
