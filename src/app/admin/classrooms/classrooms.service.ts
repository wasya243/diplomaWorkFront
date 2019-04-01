import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IClassroom = diploma.IClassroom;

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
}
