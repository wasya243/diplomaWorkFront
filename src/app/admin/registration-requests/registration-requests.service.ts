import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IRegistrationRequest = diploma.IRegistrationRequest;
import IPermittedRegistrationRequest = diploma.IPermittedRegistrationRequest;

@Injectable()
export class RegistrationRequestsService {

  constructor(private http: HttpClient) {
  }

  getRegistrationRequests(): Observable<Array<IRegistrationRequest>> {

    return this.http.get<IRegistrationRequest[]>(`/registration-requests`);
  }

  permitRegistrationRequest(id: number): Observable<IPermittedRegistrationRequest> {

    return this.http.put<IPermittedRegistrationRequest>(`/registration-requests/${id}`, null);
  }
}
