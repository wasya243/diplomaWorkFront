import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import IClassroom = diploma.IClassroom;
import ICreateClassroom = diploma.ICreateClassroom;
import IUpdateClassroom = diploma.IUpdateClassroom;

@Injectable()
export class ClassroomsService {

  private initClassroomCreationSubject = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getClassrooms(): Observable<Array<IClassroom>> {
    return this.http.get<IClassroom[]>(`/classrooms`);
  }

  getClassroomsByFaculty(facultyId): Observable<Array<IClassroom>> {
    return this.http.get<IClassroom[]>(`/faculties/${facultyId}/classrooms`);
  }

  removeClassroom(id: number): Observable<{}> {
    return this.http.delete(`/classrooms/${id}`);
  }

  updateClassroom(id: number, classroomData: IUpdateClassroom): Observable<IClassroom> {
    return this.http.put<IClassroom>(`/classrooms/${id}`, classroomData);
  }

  createClassroom(classroomData: ICreateClassroom): Observable<IClassroom> {
    return this.http.post<IClassroom>(`/classrooms`, classroomData);
  }

  onInitClassroomCreationSubject(): Subject<void> {
    return this.initClassroomCreationSubject;
  }

  initClassroomCreation(): void {
    this.initClassroomCreationSubject.next();
  }
}
