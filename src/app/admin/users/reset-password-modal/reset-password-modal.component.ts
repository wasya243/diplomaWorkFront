import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import { ValidationService } from '../../../core/validation.service';
import { ModalService } from '../../../shared/modal/modal.service';
import { GeneratePasswordService } from '../../../core/generate-password.service';
import { UsersService } from '../users.service';

import IUser = diploma.IUser;


@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: [ './reset-password-modal.component.scss' ]
})
export class ResetPasswordModalComponent implements OnInit {

  @Input() data: IUser;

  keyIcon = faKey;
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private userService: UsersService,
    private generatePasswordService: GeneratePasswordService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: [ '', [ Validators.required, ValidationService.emailValidator ] ],
      password: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(10) ] ]
    });
  }

  ngOnInit() {
    this.resetPasswordForm.patchValue({ email: this.data.email });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const newPassword = this.resetPasswordForm.get('password').value;
    this.userService.resetPassword(this.data.id, newPassword)
      .subscribe(() => {
        this.modalService.apply(this.data.id);
      }, (error) => {
        console.error(error);
      });
  }

  generatePassword(): void {
    this.resetPasswordForm.patchValue({ password: this.generatePasswordService.generatePassword() });
  }

}
