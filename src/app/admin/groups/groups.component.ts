import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { GroupsService } from '../../shared/groups.service';
import { ModalService } from '../../shared/modal/modal.service';

import IGroup = diploma.IGroup;

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

  constructor(
    private groupsService: GroupsService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.getGroups();
    // this.facultiesService.onInitFacultyCreationSubject().subscribe(async () => {
    //   this.modalService.open(CreateFacultyModalComponent, { size: 'lg' })
    //     .then(() => {
    //       this.getGroups();
    //     })
    //     .catch(error => console.error(error));
    // });
  }

  onEditGroup(group) {
    console.log(group);
  }

  onRemoveGroup(group) {
    console.log(group);
  }

  private getGroups(): void {
    this.groupsService.getGroups()
      .subscribe((groups) => {
        this.groups.items = groups;
      }, error => console.error(error));
  }

}
