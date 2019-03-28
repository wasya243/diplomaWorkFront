import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from './core.module';

import IRole = diploma.IRole;

@Injectable({ providedIn: CoreModule })
export class RoleService {

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>('/roles');
  }
}
