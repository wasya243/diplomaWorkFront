import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthTokenService } from './auth-token.service';
import { StorageService } from '../core/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import IUserData = diploma.IUserData;
import ILogInCredentials = diploma.ILogInCredentials;
import ISignUpCredentials = diploma.ISignUpCredentials;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static userRoles = {
    ADMIN: 'admin',
    DISPATCHER: 'dispatcher'
  };

  static defaultPaths = {
    admin: '/admin',
    dispatcher: '/dispatcher',
    unauthorized: '/login',
    'access-denied': '/access-denied'
  };

  constructor(
    private authTokenService: AuthTokenService,
    private storageService: StorageService,
    private http: HttpClient
  ) {
  }

  login(loginCredentials: ILogInCredentials): Observable<any> {
    return this.http.post('/auth/sign-in', loginCredentials)
      .pipe(map((userData: IUserData) => {
        const { accessToken } = userData;
        this.authTokenService.setToken(accessToken);
        this.storageService.saveUserData({
          accessToken,
          userInfo: {
            email: userData.userInfo.email,
            firstName: userData.userInfo.firstName,
            lastName: userData.userInfo.lastName,
            role: userData.userInfo.role,
            id: userData.userInfo.id
          }
        });
      }));
  }

  signup(credentials: ISignUpCredentials): Observable<void> {
    return this.http.post('/auth/sign-up', credentials)
      .pipe(map((userData: any) => {
        // TODO: start handling action
        console.log(userData);
      }));
  }

  logout(): Observable<void> {
    return this.http.post('/auth/sign-out', null)
      .pipe(map((response: any) => {
        this.authTokenService.removeToken();
        this.storageService.removeUserData();
      }));
  }

  isAuthorized(): boolean {
    return this.authTokenService.hasAccessToken();
  }
}
