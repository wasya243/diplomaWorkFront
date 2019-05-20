import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import IAssignment = diploma.IAssignment;
import ICreateAssignment = diploma.ICreateAssignment;
import ICreatedAssignment = diploma.ICreatedAssignment;

@Injectable()
export class AssignmentsService {

  private initAssignmentCreationSubject = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getAssignments(start: string, end: string): Observable<Array<IAssignment>> {
    return this.http.get<IAssignment[]>(`/assignments`, { params: { start, end } });
  }

  createAssignment(assignment: ICreateAssignment): Observable<ICreatedAssignment> {
    return this.http.post<ICreatedAssignment>(`/assignments`, assignment);
  }

  removeAssignment(assignmentId: number): Observable<{}> {
    return this.http.delete(`/assignments/${assignmentId}`);
  }

  // TODO: add types
  updateAssignment(assignmentId: number, requestObject: any): Observable<any> {
    return this.http.put(`/assignments/${assignmentId}`, requestObject);
  }

  onInitAssignmentCreationSubject(): Subject<void> {
    return this.initAssignmentCreationSubject;
  }

  initAssignmentCreation(): void {
    this.initAssignmentCreationSubject.next();
  }
}
