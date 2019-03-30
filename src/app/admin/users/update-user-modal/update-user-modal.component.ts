import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { ValidationService } from '../../../core/validation.service';
import { UsersService } from '../users.service';

import IUser = diploma.IUser;
import IUpdateUser = diploma.IUpdateUser;

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
    this.userForm = this.fb.group({
      email: [ '', [ Validators.required, ValidationService.emailValidator ] ],
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '', [ Validators.required ] ]
    });
  }

  ngOnInit() {
    this.userForm.patchValue(this.data);
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
