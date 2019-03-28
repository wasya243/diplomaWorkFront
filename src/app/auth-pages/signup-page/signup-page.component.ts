import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { RoleService } from '../../core/role.service';
import { ValidationService } from '../../core/validation.service';

import ISignUpCredentials = diploma.ISignUpCredentials;
import IRole = diploma.IRole;

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
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: [ './signup-page.component.scss' ]
})
export class SignupPageComponent implements OnInit {

  signupForm: FormGroup;
  currentState = passwordFieldStates.hidePassword;
  errorMessage = null;
  private dispatcherRole: IRole = null;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.signupForm = fb.group({
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required, ValidationService.emailValidator ] ],
      password: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(10) ] ]
    });
  }

  ngOnInit() {
    // TODO: check if I really need it
    this.authService.isAuthorized() && this.router.navigate([ 'admin' ]);
    this.roleService.getRoles()
      .subscribe((roles: IRole[]) => {
        this.dispatcherRole = (roles.filter(role => role.name === 'dispatcher')[ 0 ]) as IRole;
      }, (error: Error) => {
        // TODO: think of handling this error
        console.error(error);
      });
  }

  private canSignUp(): boolean {
    return this.signupForm.valid;
  }

  private get formValue() {
    return this.signupForm.value;
  }

  onShowPassword() {
    this.currentState = this.currentState === passwordFieldStates.showPassword ?
      passwordFieldStates.hidePassword : passwordFieldStates.showPassword;
  }

  onInput() {
    this.errorMessage = null;
  }

  onSubmit() {
    this.signupForm.controls.email.markAsTouched();
    this.signupForm.controls.password.markAsTouched();
    if (this.canSignUp()) {
      // TODO: fetch dispatcher role instead of hardcoding it
      const signUpData: ISignUpCredentials = Object.assign(this.formValue, { role: this.dispatcherRole.id });
      this.authService.signup(signUpData)
        .subscribe(resp => {
            this.router.navigate([ 'login' ]);
          },
          error => {
            if (error.status === 400) {
              this.errorMessage = 'Your email address is already in use. \nPlease check your data and try again';
            }
          });
    }
  }

}
