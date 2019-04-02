import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { ClassroomsService } from '../classrooms.service';
import { FacultiesService } from '../../faculties/faculties.service';

import IClassroom = diploma.IClassroom;
import IProcessedFaculty = diploma.IProcessedFaculty;
import IFaculty = diploma.IFaculty;

@Component({
  selector: 'app-update-classroom-modal',
  templateUrl: './update-classroom-modal.component.html',
  styleUrls: [ './update-classroom-modal.component.scss' ]
})
export class UpdateClassroomModalComponent implements OnInit {

  @Input() data: IClassroom;

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
      number: [ this.data.number, [ Validators.required ] ],
      amountOfSeats: [ this.data.amountOfSeats, [ Validators.required ] ],
      facultyId: [ this.data.faculty.id, [ Validators.required ] ]
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
    this.classroomsService.updateClassroom(this.data.id, this.classroomForm.value)
      .subscribe((updatedClassroom: IClassroom) => {
          this.modalService.apply(updatedClassroom);
        },
        error => {
          console.error(error);
        });
  }

}
