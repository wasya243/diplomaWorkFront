import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';

import { UsersService } from './users.service';
import { IGridSortableColumnData } from '../../shared/grid/grid.module';

import IUser = diploma.IUser;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {

  users: {
    items: Array<IUser>,
    metadata?: any
  } = {
    items: []
  };
  pencilAltIcon = faPencilAlt;
  trashIcon = faTrash;
  undoIcon = faUndo;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users.items = data;
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

  onSortChange(sortData: IGridSortableColumnData) {
    console.log(sortData);
    // TODO: return back when respective functionality is implemented on the backend
    // this.usersService.getUsers(sortData)
    //   .subscribe(data => {
    //     this.users.items = data;
    //   });
  }

  onEditUser(clickedRow: IUser): void {
    console.log(clickedRow);
    // TODO: return back when respective functionality is implemented on both front & back
    // this.modalService.open(UpdateUserModalComponent, { size: 'sm' }, clickedRow)
    //   .then(data => {
    //     this.users.items.map(
    //       (cmsUser: ICreatedUserResponse) => {
    //         return cmsUser._id === (<ICreatedUserResponse>data)._id && Object.assign(cmsUser, data);
    //       });
    //   })
    //   .catch(error => {});
  }

  onDeleteUser(clickedRow: IUser): void {
    console.log(clickedRow);
    // TODO: return back when respective functionality is implemented on both front & back
    // this.modalService.open(DeleteUserModalComponent, { size: 'sm' }, clickedRow)
    //   .then((data) => {
    //     this.users.items = this.users.items.filter((cmsUser: ICreatedUserResponse) => cmsUser._id !== data);
    //   })
    //   .catch(error => {});
  }

  onResetPassword(clickedRow: IUser): void {
    console.log(clickedRow);
    // TODO: return back when respective functionality is implemented on both front & back
    // this.modalService.open(ResetPasswordModalComponent, { size: 'sm' }, clickedRow)
    //   .then(data => {
    //     // if it is needed somehow handle this action
    //   })
    //   .catch(error => {});
  }

}
