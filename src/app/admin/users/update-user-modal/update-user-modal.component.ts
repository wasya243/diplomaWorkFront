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
    this.userForm = this.fb.group({
      email: [ { value: '', disabled: true }, [ Validators.required, ValidationService.emailValidator ] ],
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
    console.log(this.data);
    this.modalService.apply(this.data);
    // TODO: return when functionality is ready
    // this.userService.updateUser(this.data.id, this.userForm.value)
    //   .subscribe(updatedCmsUser => {
    //       this.modalService.apply(updatedCmsUser);
    //     },
    //     error => {
    //       console.error(error);
    //     });
  }

}
