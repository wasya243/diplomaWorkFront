import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from '../../../shared/modal/modal.service';

import IUser = diploma.IUser;
import { UsersService } from '../users.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: [ './delete-user-modal.component.scss' ]
})
export class DeleteUserModalComponent implements OnInit {

  @Input() data: IUser;

  constructor(
    private modalService: ModalService,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const userId = this.data.id;
    this.usersService.removeUser(userId)
      .subscribe(() => {
        this.modalService.apply(userId);
      }, (error) => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
