import { Injectable } from '@angular/core';
import { StorageService } from '../core/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private accessToken: string;

  constructor(private storageService: StorageService) {
    const user = this.storageService.get('user', true);
    if (user) {
      this.accessToken = user.accessToken;
    }
  }

  hasAccessToken(): boolean {
    return Boolean(this.accessToken);
  }

  setToken(accessToken): void {
    this.accessToken = accessToken;
  }

  getAccessToken(): string {

    return this.accessToken;
  }

  removeToken(): void {
    this.accessToken = null;
  }

  getAuthorizationHeader(): string {

    return `Bearer ${this.accessToken}`;
  }
}
