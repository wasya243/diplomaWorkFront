import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../shared/modal/modal.service';
import { FacultiesService } from '../faculties.service';

import IFaculty = diploma.IFaculty;

@Component({
  selector: 'app-delete-faculty-modal',
  templateUrl: './delete-faculty-modal.component.html',
  styleUrls: [ './delete-faculty-modal.component.scss' ]
})
export class DeleteFacultyModalComponent implements OnInit {

  @Input() data: IFaculty;

  constructor(
    private modalService: ModalService,
    private facultiesService: FacultiesService
  ) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const facultyId = this.data.id;
    this.facultiesService.removeFaculty(facultyId)
      .subscribe(() => {
        this.modalService.apply(facultyId);
      }, (error) => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
