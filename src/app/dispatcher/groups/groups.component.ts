import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { GroupsService } from '../../shared/groups.service';
import { ModalService } from '../../shared/modal/modal.service';
import { StorageService } from '../../core/storage.service';
import { IGridSortableColumnData } from '../../shared/grid/grid.module';
import { DeleteGroupModalComponent } from './delete-group-modal/delete-group-modal.component';
import { UpdateGroupModalComponent } from './update-group-modal/update-group-modal.component';
import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';

import IGroup = diploma.IGroup;
import IUser = diploma.IUser;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: [ './groups.component.scss' ]
})
export class GroupsComponent implements OnInit {

  groups: {
    items: Array<IGroup>,
    metadata?: any
  } = {
    items: []
  };

  pencilAltIcon = faPencilAlt;
  trashIcon = faTrash;
  private userData: IUser;

  constructor(
    private groupsService: GroupsService,
    private modalService: ModalService,
    private storageService: StorageService
  ) {
    this.userData = this.storageService.getUserData().userInfo as IUser;
  }

  ngOnInit() {
    this.getGroups();
    this.groupsService.onInitGroupCreationSubject().subscribe(async () => {
      this.modalService.open(CreateGroupModalComponent, { size: 'lg' })
        .then(() => {
          this.getGroups();
        })
        .catch(error => console.error(error));
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

  onEditGroup(clickedRow: IGroup) {
    this.modalService.open(UpdateGroupModalComponent, { size: 'sm' }, clickedRow)
      .then(data => {
        this.groups.items.map(
          (group: IGroup) => {
            return group.id === (data as IGroup).id && Object.assign(group, data);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onRemoveGroup(clickedRow: IGroup) {
    this.modalService.open(DeleteGroupModalComponent, { size: 'sm' }, clickedRow)
      .then((id) => {
        this.groups.items = this.groups.items.filter((group: IGroup) => group.id !== id);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private getGroups(): void {
    const facultyId = this.userData.facultyId;
    this.groupsService.getGroupsByFaculty(facultyId)
      .subscribe((groups) => {
        this.groups.items = groups;
      }, error => console.error(error));
  }

}
