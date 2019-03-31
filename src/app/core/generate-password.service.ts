import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule
})
export class GeneratePasswordService {
  generatePassword() {
    const alphabet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}<>/?.,|/';
    const maxLength = 32;
    const minLength = 6;
    const passwordLength = Math.round(Math.random() * (maxLength - minLength) + minLength);
    let password = '';
    const alphabetLength = alphabet.length - 1;
    for (let i = 0; i < passwordLength; i++) {
      const currentSymbolIndex = Math.round(Math.random() * alphabetLength);
      password += alphabet[ currentSymbolIndex ];
    }

    return password;
  }
}
