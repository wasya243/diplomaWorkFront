import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IClassroom = diploma.IClassroom;
import IUpdateClassroom = diploma.IUpdateClassroom;

@Injectable()
export class ClassroomsService {

  constructor(private http: HttpClient) {
  }

  getClassrooms(): Observable<Array<IClassroom>> {
    return this.http.get<IClassroom[]>(`/classrooms`);
  }

  removeClassroom(id: number): Observable<{}> {
    return this.http.delete(`/classrooms/${id}`);
  }

  updateClassroom(id: number, classroomData: IUpdateClassroom): Observable<IClassroom> {
    return this.http.put<IClassroom>(`/classrooms/${id}`, classroomData);
  }
}
