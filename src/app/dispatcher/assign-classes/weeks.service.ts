import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IWeek = diploma.IWeek;

@Injectable()
export class WeeksService {

  constructor(private http: HttpClient) {
  }

  getWeeksByTerm(termId: number): Observable<Array<IWeek>> {
    return this.http.get<IWeek[]>(`/terms/${termId}/weeks`);
  }
}
