import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IFaculty = diploma.IFaculty;

@Injectable()
export class FacultiesService {

  constructor(private http: HttpClient) {
  }

  getFaculties(): Observable<Array<IFaculty>> {

    return this.http.get<IFaculty[]>(`/faculties`);
  }
}
