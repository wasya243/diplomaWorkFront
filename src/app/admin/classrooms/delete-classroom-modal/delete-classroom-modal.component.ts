import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from '../../../shared/modal/modal.service';
import { ClassroomsService } from '../../../shared/classrooms.service';

import IClassroom = diploma.IClassroom;

@Component({
  selector: 'app-delete-classroom-modal',
  templateUrl: './delete-classroom-modal.component.html',
  styleUrls: [ './delete-classroom-modal.component.scss' ]
})
export class DeleteClassroomModalComponent implements OnInit {

  @Input() data: IClassroom;

  constructor(
    private modalService: ModalService,
    private classroomsService: ClassroomsService
  ) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const classroomId = this.data.id;
    this.classroomsService.removeClassroom(classroomId)
      .subscribe(() => {
        this.modalService.apply(classroomId);
      }, (error) => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
