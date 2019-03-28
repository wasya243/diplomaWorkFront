import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { ValidationService } from '../../core/validation.service';
import { AuthService } from '../../auth/auth.service';

const passwordFieldStates = {
  showPassword: {
    eye: faEye,
    type: 'text',
    class: 'show'
  },
  hidePassword: {
    eye: faEyeSlash,
    type: 'password',
    class: 'hide'
  }
};

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  currentState = passwordFieldStates.hidePassword;
  errorMessage = null;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.loginForm = fb.group({
      email: [ '', [ Validators.required, ValidationService.emailValidator ] ],
      password: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(10) ] ]
    });
  }

  ngOnInit() {
    this.authService.isAuthorized() && this.router.navigate([ 'admin' ]);
  }

  private canAuthorize(): boolean {
    return this.loginForm.valid;
  }

  private get formValue() {
    return this.loginForm.value;
  }

  onShowPassword() {
    this.currentState = this.currentState === passwordFieldStates.showPassword ?
      passwordFieldStates.hidePassword : passwordFieldStates.showPassword;
  }

  onInput() {
    this.errorMessage = null;
  }

  onSubmit() {
    this.loginForm.controls.email.markAsTouched();
    this.loginForm.controls.password.markAsTouched();
    if (this.canAuthorize()) {
      this.authService.login(this.formValue)
        .subscribe(resp => {
            this.router.navigate([ 'admin' ]);
          },
          error => {
            if (error.status === 401) {
              this.errorMessage = 'Your email address or password is incorrect. \nPlease check your data and try again';
            }
          });
    }
  }
}
