import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IUser = diploma.IUser;
import IUpdateUser = diploma.IUpdateUser;

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Array<IUser>> {

    return this.http.get<IUser[]>(`/users`);
  }

  updateUser(id: string, userData: IUpdateUser): Observable<IUser> {
    return this.http.put<IUser>(`/users/${id}`, userData);
  }
}
