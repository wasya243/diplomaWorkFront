import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import IFaculty = diploma.IFaculty;
import IUpdateFaculty = diploma.IUpdateFaculty;

@Injectable()
export class FacultiesService {

  private initFacultyCreationSubject = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getFaculties(): Observable<Array<IFaculty>> {
    return this.http.get<IFaculty[]>(`/faculties`);
  }

  removeFaculty(id: number): Observable<{}> {
    return this.http.delete(`/faculties/${id}`);
  }

  updateFaculty(id: number, facultyData: IUpdateFaculty): Observable<IFaculty> {
    return this.http.put<IFaculty>(`/faculties/${id}`, facultyData);
  }

  createFaculty(facultyData: IUpdateFaculty): Observable<IFaculty> {
    return this.http.post<IFaculty>(`/faculties`, facultyData);
  }

  onInitFacultyCreationSubject(): Subject<void> {
    return this.initFacultyCreationSubject;
  }

  initFacultyCreation(): void {
    this.initFacultyCreationSubject.next();
  }
}
