import { Component, OnInit, Input } from '@angular/core';

import IReport = diploma.IReport;
import IDoubleLesson = diploma.IDoubleLesson;

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: [ './report-table.component.scss' ]
})
export class ReportTableComponent implements OnInit {

  @Input() report: IReport;
  @Input() doubleLessons: Array<IDoubleLesson>;

  constructor() {
  }

  ngOnInit() {
  }
}

