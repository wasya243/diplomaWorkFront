import * as moment from 'moment-timezone';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { ModalService } from '../../../shared/modal/modal.service';
import { RequestsService } from '../requests.service';
import { FacultiesService } from '../../../shared/faculties.service';
import { ClassroomsService } from '../../../shared/classrooms.service';
import { DoubleLessonsService } from '../../../shared/double-lessons.service';
import { StorageService } from '../../../core/storage.service';
import { AlertService } from '../../../shared/alert/alert.service';

import IUserData = diploma.IUserData;
import IProcessedFaculty = diploma.IProcessedFaculty;
import IFaculty = diploma.IFaculty;
import IClassroom = diploma.IClassroom;
import IProcessedClassroom = diploma.IProcessedClassroom;
import IRequest = diploma.IRequest;

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html',
  styleUrls: [ './create-request-modal.component.scss' ]
})
export class CreateRequestModalComponent implements OnInit {

  userData: IUserData;
  requestForm: FormGroup;
  faculties: Array<IProcessedFaculty> = [];
  classrooms: Array<IProcessedClassroom> = [];
  timepoints: Array<any> = [];
  calendarIcon = faCalendar;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private requestsService: RequestsService,
    private facultiesService: FacultiesService,
    private classroomService: ClassroomsService,
    private doubleLessonsService: DoubleLessonsService,
    private storageService: StorageService,
    private alertService: AlertService
  ) {
    this.userData = this.storageService.get('user', true) as IUserData;
    this.requestForm = this.fb.group({
      facultyId: [ null, [ Validators.required ] ],
      classroomId: [ null, [ Validators.required ] ],
      dateStart: [ null, [ Validators.required ] ],
      dateEnd: [ null, [ Validators.required ] ],
      timeStart: [ null, [ Validators.required ] ],
      timeEnd: [ null, [ Validators.required ] ]
    });
  }

  ngOnInit() {
    this.getFaculties();
    this.getTimePoints();
  }

  onSelectFaculty(value: string): void {
    const facultyId = parseInt(value.split(': ')[ 1 ], 10);
    this.getClassroomsByFaculty(facultyId);
  }

  private getFaculties(): void {
    this.facultiesService.getFaculties()
      .subscribe((data: Array<IFaculty>) => {
        this.faculties = data
          .filter(faculty => faculty.id !== this.userData.userInfo.facultyId)
          .map(faculty => Object.assign({}, { id: faculty.id, name: faculty.name }));
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

  private getClassroomsByFaculty(facultyId): void {
    this.classroomService.getClassroomsByFaculty(facultyId)
      .subscribe((data: Array<IClassroom>) => {
        this.classrooms = data.map(classroom => Object.assign({}, {
          id: classroom.id,
          classroom: classroom.number
        })) as Array<IProcessedClassroom>;
      });
  }

  private getTimePoints(): void {
    this.doubleLessonsService.getDoubleLessons()
      .subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.timepoints.push(moment(data[ i ].start).format('hh:mm a'));
          this.timepoints.push(moment(data[ i ].end).format('hh:mm a'));
        }
      });
  }

  private getFullDate(year: number, day: number, month: number, time: string): string {
    return `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day} ${time}`;
  }

  cancel(): void {
    console.log(this.requestForm.value);
    this.modalService.dismiss();
  }

  save(): void {
    const formValue = this.requestForm.value;

    const startDate = moment(this.getFullDate(formValue.dateStart.year, formValue.dateStart.day, formValue.dateStart.month, formValue.timeStart)).format();
    const endDate = moment(this.getFullDate(formValue.dateEnd.year, formValue.dateEnd.day, formValue.dateEnd.month, formValue.timeEnd)).format();

    const requestObject = {
      start: startDate,
      end: endDate,
      classroomId: formValue.classroomId
    };

    this.requestsService.createRequest(requestObject)
      .subscribe((createdRequest: IRequest) => {
          this.modalService.apply(createdRequest);
        },
        error => {
          this.alertService.error(error.error.data ? error.error.data : 'Bad request', 5000);
        });
  }

}
