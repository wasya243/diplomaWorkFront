import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { RequestsService } from '../requests.service';
import { FacultiesService } from '../../../shared/faculties.service';
import { ClassroomsService } from '../../../shared/classrooms.service';

import IProcessedFaculty = diploma.IProcessedFaculty;
import IFaculty = diploma.IFaculty;
import IClassroom = diploma.IClassroom;
import IProcessedClassroom = diploma.IProcessedClassroom;

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html',
  styleUrls: [ './create-request-modal.component.scss' ]
})
export class CreateRequestModalComponent implements OnInit {

  requestForm: FormGroup;
  faculties: Array<IProcessedFaculty> = [];
  classrooms: Array<IProcessedClassroom> = [];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private requestsService: RequestsService,
    private facultiesService: FacultiesService,
    private classroomService: ClassroomsService
  ) {
    this.requestForm = this.fb.group({
      facultyId: [ '', [ Validators.required ] ],
      classroomId: [ '', Validators.required ]
    });
  }

  ngOnInit() {
    this.getFaculties();
  }

  onSelectFaculty(value: string): void {
    const facultyId = parseInt(value.split(': ')[ 1 ], 10);
    this.getClassroomsByFaculty(facultyId);
  }

  private getFaculties(): void {
    this.facultiesService.getFaculties()
      .subscribe((data: Array<IFaculty>) => {
        this.faculties = data.map(faculty => Object.assign({}, { id: faculty.id, name: faculty.name }));
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

  private getClassroomsByFaculty(facultyId): void {
    this.classroomService.getClassroomsByFaculty(facultyId)
      .subscribe((data: Array<IClassroom>) => {
        this.classrooms = data.map(classroom => Object.assign({}, { id: classroom.id, classroom: classroom.number })) as Array<IProcessedClassroom>;
      });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    console.log('saved');
  }

}
