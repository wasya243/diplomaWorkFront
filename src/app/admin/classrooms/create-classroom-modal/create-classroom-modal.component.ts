import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { ClassroomsService } from '../classrooms.service';
import { FacultiesService } from '../../faculties/faculties.service';

import IClassroom = diploma.IClassroom;
import IProcessedFaculty = diploma.IProcessedFaculty;
import IFaculty = diploma.IFaculty;

@Component({
  selector: 'app-create-classroom-modal',
  templateUrl: './create-classroom-modal.component.html',
  styleUrls: [ './create-classroom-modal.component.scss' ]
})
export class CreateClassroomModalComponent implements OnInit {

  classroomForm: FormGroup;
  faculties: Array<IProcessedFaculty> = [];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private classroomsService: ClassroomsService,
    private facultiesService: FacultiesService
  ) {
  }

  ngOnInit() {
    this.classroomForm = this.fb.group({
      number: [ 0, [ Validators.required ] ],
      amountOfSeats: [ 0, [ Validators.required ] ],
      facultyId: [ '', [ Validators.required ] ]
    });
    this.facultiesService.getFaculties()
      .subscribe((data: Array<IFaculty>) => {
        this.faculties = data.map(faculty => Object.assign({}, { id: faculty.id, name: faculty.name }));
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    this.classroomsService.createClassroom(this.classroomForm.value)
      .subscribe((createdClassroom: IClassroom) => {
          this.modalService.apply(createdClassroom);
        },
        error => {
          console.error(error);
        });
  }

}
