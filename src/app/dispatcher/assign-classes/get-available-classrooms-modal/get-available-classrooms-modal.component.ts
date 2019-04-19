import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { FacultiesService } from '../../../shared/faculties.service';
import { FormattingService } from '../../../shared/formatting.service';

import IDoubleLesson = diploma.IDoubleLesson;
import IFaculty = diploma.IFaculty;

@Component({
  selector: 'app-get-available-classrooms-modal',
  templateUrl: './get-available-classrooms-modal.component.html',
  styleUrls: [ './get-available-classrooms-modal.component.scss' ]
})
export class GetAvailableClassroomsModalComponent implements OnInit, AfterViewInit {

  assignmentDate: string;
  doubleLesson: IDoubleLesson;
  faculties: Array<IFaculty> = [];
  getAvailableClassroomsForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private facultiesService: FacultiesService,
    private formattingService: FormattingService,
    private fb: FormBuilder
  ) {
    this.getAvailableClassroomsForm = this.fb.group({
      facultyId: [ null, [ Validators.required ] ],
      assignmentDate: [ { value: null, disabled: true } ],
      doubleLesson: [ { value: null, disabled: true } ]
    });
  }

  ngOnInit() {
    this.facultiesService.getFaculties()
      .subscribe(faculties => {
        this.faculties = faculties;
      }, error => console.error(error));
  }

  ngAfterViewInit() {
    const passedData = this.modalService.getPassedData();

    this.assignmentDate = passedData.assignmentDate;
    this.doubleLesson = passedData.doubleLesson;

    this.getAvailableClassroomsForm.patchValue({
      assignmentDate: this.formattingService.formatDate(this.assignmentDate, 'YYYY-MM-DD'),
      doubleLesson: this.doubleLesson.number
    });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const requestObject = {
      doubleLessonId: this.doubleLesson.id,
      facultyId: this.getAvailableClassroomsForm.value.facultyId,
      assignmentDate: this.formattingService.formatDate(this.assignmentDate, 'YYYY-MM-DD')
    };
    this.modalService.apply(requestObject);
  }

}
