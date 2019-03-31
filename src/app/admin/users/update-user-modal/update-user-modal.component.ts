import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { ValidationService } from '../../../core/validation.service';
import { UsersService } from '../users.service';

import IUser = diploma.IUser;

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: [ './update-user-modal.component.scss' ]
})
export class UpdateUserModalComponent implements OnInit {

  @Input() data: IUser;

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private userService: UsersService
  ) {
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: [ this.data.email, [ Validators.required, ValidationService.emailValidator ] ],
      firstName: [ this.data.firstName, [ Validators.required ] ],
      lastName: [ this.data.lastName, [ Validators.required ] ],
      role: [ { value: this.data.role, disabled: true }, [ Validators.required ] ]
    });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    this.userService.updateUser(this.data.id, this.userForm.value)
      .subscribe((updatedUser: IUser) => {
          this.modalService.apply(updatedUser);
        },
        error => {
          console.error(error);
        });
  }

}
