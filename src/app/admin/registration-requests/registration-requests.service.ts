import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IRegistrationRequest = diploma.IRegistrationRequest;

@Injectable()
export class RegistrationRequestsService {

  constructor(private http: HttpClient) {
  }

  getRegistrationRequests(): Observable<Array<IRegistrationRequest>> {

    return this.http.get<IRegistrationRequest[]>(`/registration-requests`);
  }
}
