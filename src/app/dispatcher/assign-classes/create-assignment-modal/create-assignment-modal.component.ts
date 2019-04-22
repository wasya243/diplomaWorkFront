import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment-timezone';

import { ModalService } from '../../../shared/modal/modal.service';
import { FacultiesService } from '../../../shared/faculties.service';
import { ClassroomsService } from '../../../shared/classrooms.service';
import { StorageService } from '../../../core/storage.service';
import { AssignmentsService } from '../assignments.service';
import { DoubleLessonsService } from '../../../shared/double-lessons.service';
import { GroupsService } from '../../../shared/groups.service';
import { AlertService } from '../../../shared/alert/alert.service';

import IUserData = diploma.IUserData;
import IFaculty = diploma.IFaculty;
import IProcessedFaculty = diploma.IProcessedFaculty;
import IClassroom = diploma.IClassroom;
import IProcessedClassroom = diploma.IProcessedClassroom;
import IDoubleLesson = diploma.IDoubleLesson;
import IGroup = diploma.IGroup;

@Component({
  selector: 'app-create-assignment-modal',
  templateUrl: './create-assignment-modal.component.html',
  styleUrls: [ './create-assignment-modal.component.scss' ]
})
export class CreateAssignmentModalComponent implements OnInit {

  userData: IUserData;
  faculties: Array<IProcessedFaculty> = [];
  classrooms: Array<IProcessedClassroom> = [];
  doubleLessons: Array<IDoubleLesson> = [];
  groups: Array<IGroup> = [];
  calendarIcon = faCalendar;
  assignmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private groupsService: GroupsService,
    private classroomsService: ClassroomsService,
    private facultiesService: FacultiesService,
    private assignmentService: AssignmentsService,
    private storageService: StorageService,
    private modalService: ModalService,
    private doubleLessonsService: DoubleLessonsService,
    private alertService: AlertService
  ) {
    this.userData = this.storageService.get('user', true) as IUserData;
    this.assignmentForm = this.fb.group({
      facultyId: [ null, [ Validators.required ] ],
      classroomId: [ null, [ Validators.required ] ],
      assignmentDate: [ null, [ Validators.required ] ],
      doubleLessonId: [ null, [ Validators.required ] ],
      groupId: [ null, [ Validators.required ] ]
    });
  }

  ngOnInit() {
    this.fetchInitialDataToDisplay()
      .subscribe((response) => {
        this.faculties = this.processFaculties(response[ 1 ]);
        this.doubleLessons = response[ 0 ];
        this.groups = response[ 2 ];
      }, error => console.error(error));
  }

  onSelectFaculty(value: string): void {
    const facultyId = parseInt(value.split(': ')[ 1 ], 10);
    this.getClassroomsByFaculty(facultyId);
  }

  private fetchInitialDataToDisplay() {
    return forkJoin(
      this.getDoubleLessons(),
      this.getFaculties(),
      this.getGroups()
    );
  }

  private getDoubleLessons() {
    return this.doubleLessonsService.getDoubleLessons();
  }

  private getClassroomsByFaculty(facultyId) {
    return this.classroomsService.getClassroomsByFaculty(facultyId)
      .subscribe((data: Array<IClassroom>) => {
        this.classrooms = data.map(classroom => Object.assign({}, {
          id: classroom.id,
          classroom: classroom.number
        })) as Array<IProcessedClassroom>;
      });
  }

  private getFaculties(): Observable<Array<IFaculty>> {
    return this.facultiesService.getFaculties();
  }

  private getGroups(): Observable<Array<IGroup>> {
    return this.groupsService.getGroupsByFaculty(this.userData.userInfo.facultyId);
  }

  private processFaculties(faculties: Array<IFaculty>): Array<IProcessedFaculty> {
    return faculties
      .map(faculty => Object.assign({}, { id: faculty.id, name: faculty.name }));
  }

  private getFullDate(year: number, day: number, month: number, time: string): string {
    return `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day} ${time}`;
  }

  cancel(): void {
    console.log(this.assignmentForm.value);
    this.modalService.dismiss();
  }

  save(): void {
    const formValue = this.assignmentForm.value;
    const date = moment(this.getFullDate(
      formValue.assignmentDate.year,
      formValue.assignmentDate.day,
      formValue.assignmentDate.month,
      '10:00 pm')).format();

    const requestObject = {
      groupId: formValue.groupId,
      classroomId: formValue.classroomId,
      assignmentDate: date,
      doubleLessonId: formValue.doubleLessonId
    };

    this.assignmentService.createAssignment(requestObject)
      .subscribe((createdAssignment) => {
        this.modalService.apply(createdAssignment);
      }, error => this.alertService.error(error.error.data ? error.error.data : 'Bad request', 5000));
  }

}
