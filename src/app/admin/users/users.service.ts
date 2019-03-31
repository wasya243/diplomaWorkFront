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

  updateUser(id: number, userData: IUpdateUser): Observable<IUser> {
    return this.http.put<IUser>(`/users/${id}`, userData);
  }

  removeUser(id: number): Observable<{}> {
    return this.http.delete(`/users/${id}`);
  }

  resetPassword(id: number, newPassword: string): Observable<{}> {
    return this.http.put(`/users/${id}/reset-password`, { password: newPassword });
  }
}
