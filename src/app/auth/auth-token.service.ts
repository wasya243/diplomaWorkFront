import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private accessToken: string;

  hasAccessToken(): boolean {

    return Boolean(this.accessToken);
  }

  setAccessToken(token): void {
    this.accessToken = token;
  }

  getAccessToken(): string {

    return this.accessToken;
  }

  removeAccessToken(): void {
    this.accessToken = null;
  }

  getAuthorizationHeader(): string {

    return `Bearer ${this.accessToken}`;
  }
}
