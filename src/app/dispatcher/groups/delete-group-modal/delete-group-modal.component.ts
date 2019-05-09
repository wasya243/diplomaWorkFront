import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from '../../../shared/modal/modal.service';
import { GroupsService } from '../../../shared/groups.service';

import IGroup = diploma.IGroup;

@Component({
  selector: 'app-delete-group-modal',
  templateUrl: './delete-group-modal.component.html',
  styleUrls: [ './delete-group-modal.component.scss' ]
})
export class DeleteGroupModalComponent implements OnInit {

  @Input() data: IGroup;

  constructor(
    private modalService: ModalService,
    private groupsService: GroupsService
  ) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const groupId = this.data.id;
    this.groupsService.removeGroup(groupId)
      .subscribe(() => {
        this.modalService.apply(groupId);
      }, (error) => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
