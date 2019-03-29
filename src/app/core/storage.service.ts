import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';

import IUserData = diploma.IUserData;

@Injectable({
  providedIn: CoreModule
})
export class StorageService {
  private STORAGE_KEY_PREFIX = 'diploma';

  constructor() {
  }

  put(key: string, data: any): this {
    this.getStorage().setItem(this.getStorageKey(key), (data && typeof data === 'object') ? JSON.stringify(data) : data);

    return this;
  }

  get(key: string, parse: boolean = false): any {
    const item = this.getStorage().getItem(this.getStorageKey(key));
    if (!parse) {

      return item;
    }
    try {

      return item && JSON.parse(item);
    } catch (error) {
      this.getStorage().removeItem(this.getStorageKey(key));
    }
  }

  remove(key: string): this {
    this.getStorage().removeItem(this.getStorageKey(key));

    return this;
  }

  saveUserData(userData): this {
    const currentUserData = this.getUserData() || {};

    return this.put('user', Object.assign(currentUserData, userData));
  }

  removeUserData(): this {

    return this.remove('user');
  }

  getUserData(): IUserData {
    return this.get('user', true);
  }

  private getStorage(): Storage {

    return localStorage;
  }

  private getStorageKey(key: string) {

    return `${this.STORAGE_KEY_PREFIX}.${key}`;
  }
}
