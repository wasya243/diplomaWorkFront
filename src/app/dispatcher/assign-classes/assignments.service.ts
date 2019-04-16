import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IAssignment = diploma.IAssignment;

@Injectable()
export class AssignmentsService {

  constructor(private http: HttpClient) {
  }

  getAssignments(start: string, end: string): Observable<Array<IAssignment>> {
    return this.http.get<IAssignment[]>(`/assignments`, { params: { start, end } });
  }
}
