import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormattingService } from '../../shared/formatting.service';

import IReport = diploma.IReport;

@Injectable()
export class ReportsService {

  private initReportCreationSubject = new Subject<void>();
  private readonly dateFormat: string;

  constructor(
    private http: HttpClient,
    private formattingService: FormattingService
  ) {
    this.dateFormat = 'YYYY-MM-DD';
  }

  getReports(start: string, end: string): Observable<Array<IReport>> {
    return this.http.get<IReport[]>(`/report`, { params: { start, end } })
      .pipe(map((listOfReports: Array<IReport>) => {
        return listOfReports.map(report => {
          report.assignmentDate = this.formattingService.formatDate(report.assignmentDate, this.dateFormat);
          return report;
        });
      }));
  }

  onInitReportCreationSubject(): Subject<void> {
    return this.initReportCreationSubject;
  }

  initReportCreation(): void {
    this.initReportCreationSubject.next();
  }
}
