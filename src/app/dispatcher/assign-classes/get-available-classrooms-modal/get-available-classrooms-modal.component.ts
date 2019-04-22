import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { FacultiesService } from '../../../shared/faculties.service';
import { FormattingService } from '../../../shared/formatting.service';

import IDoubleLesson = diploma.IDoubleLesson;
import IFaculty = diploma.IFaculty;

interface IPassedData {
  doubleLesson: IDoubleLesson;
  assignmentDate: string;
}

@Component({
  selector: 'app-get-available-classrooms-modal',
  templateUrl: './get-available-classrooms-modal.component.html',
  styleUrls: [ './get-available-classrooms-modal.component.scss' ]
})
export class GetAvailableClassroomsModalComponent implements OnInit, AfterViewInit {

  @Input() data: IPassedData;
  faculties: Array<IFaculty> = [];
  getAvailableClassroomsForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private facultiesService: FacultiesService,
    private formattingService: FormattingService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.facultiesService.getFaculties()
      .subscribe(faculties => {
        this.faculties = faculties;
      }, error => console.error(error));

    const passedData = this.data;
    this.getAvailableClassroomsForm = this.fb.group({
      facultyId: [ null, [ Validators.required ] ],
      amountOfSeats: [ null, [ Validators.required ] ],
      assignmentDate: [ { value: this.formattingService.formatDate(passedData.assignmentDate, 'YYYY-MM-DD'), disabled: true } ],
      doubleLesson: [ { value: passedData.doubleLesson.number, disabled: true } ]
    });
  }

  ngAfterViewInit() {
    // const passedData = this.modalService.getPassedData();
    //
    // this.assignmentDate = passedData.assignmentDate;
    // this.doubleLesson = passedData.doubleLesson;
    //
    // this.getAvailableClassroomsForm.patchValue({
    //   assignmentDate: this.formattingService.formatDate(this.assignmentDate, 'YYYY-MM-DD'),
    //   doubleLesson: this.doubleLesson.number
    // });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const requestObject = {
      doubleLessonId: this.data.doubleLesson.id,
      amountOfSeats: this.getAvailableClassroomsForm.value.amountOfSeats,
      facultyId: this.getAvailableClassroomsForm.value.facultyId,
      assignmentDate: this.formattingService.formatDate(this.data.assignmentDate, 'YYYY-MM-DD')
    };
    this.modalService.apply(requestObject);
  }

}
