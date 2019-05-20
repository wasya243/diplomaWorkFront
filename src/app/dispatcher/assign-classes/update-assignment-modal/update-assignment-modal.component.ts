import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import IContextMenuAssignment = diploma.IContextMenuAssignment;
import IFaculty = diploma.IFaculty;
import IProcessedFaculty = diploma.IProcessedFaculty;
import IClassroom = diploma.IClassroom;
import IDoubleLesson = diploma.IDoubleLesson;
import IGroup = diploma.IGroup;

@Component({
  selector: 'app-update-assignment-modal',
  templateUrl: './update-assignment-modal.component.html',
  styleUrls: [ './update-assignment-modal.component.scss' ]
})
export class UpdateAssignmentModalComponent implements OnInit {

  @Input() data: IContextMenuAssignment;

  userData: IUserData;
  faculties: Array<IProcessedFaculty> = [];
  classrooms: Array<IClassroom> = [];
  doubleLesson: IDoubleLesson;
  group: IGroup;
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
      // should be disabled
      assignmentDate: [ { value: null, disabled: true } ],
      doubleLesson: [ { value: null, disabled: true } ],
      group: [ { value: null, disabled: true } ]
    });
  }

  ngOnInit() {
    this.getData()
      .subscribe((response) => {
        this.group = response[ 0 ];
        this.doubleLesson = response[ 1 ];
        this.faculties = response[ 2 ];
        this.classrooms = response [ 3 ];
        const assignmentDate = moment(this.data.assignmentDate).format('YYYY-MM-DD');

        this.assignmentForm.patchValue({
          assignmentDate,
          doubleLesson: this.doubleLesson.number,
          group: this.group.name,
          facultyId: this.data.classroom.facultyId,
          classroomId: this.data.classroom.id
        });
      }, error => this.alertService.error(error.error.data ? error.error.data : 'Bad request', 5000));
  }

  onSelectFaculty(value: string): void {
    const facultyId = parseInt(value.split(': ')[ 1 ], 10);
    this.getClassroomsByFaculty(facultyId).subscribe(
      response => this.classrooms = response,
      error => this.alertService.error(error.error.data ? error.error.data : 'Bad request', 5000)
    );
  }

  private getGroup(groupId: number): Observable<IGroup> {
    return this.groupsService.getGroupById(groupId);
  }

  private getDoubleLesson(doubleLessonId: number): Observable<IDoubleLesson> {
    return this.doubleLessonsService.getDoubleLessonById(doubleLessonId);
  }

  private getClassroomsByFaculty(facultyId: number): Observable<Array<IClassroom>> {
    return this.classroomsService.getClassroomsByFaculty(facultyId);
  }

  private getFaculties(): Observable<Array<IFaculty>> {
    return this.facultiesService.getFaculties();
  }

  private getData() {
    return forkJoin(
      this.getGroup(this.data.groupId),
      this.getDoubleLesson(this.data.doubleLessonId),
      this.getFaculties(),
      this.getClassroomsByFaculty(this.userData.userInfo.facultyId)
    );
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const formValue = this.assignmentForm.value;

    const requestObject = {
      classroomId: formValue.classroomId,
      groupId: this.data.groupId,
      assignmentDate: this.data.assignmentDate,
      doubleLessonId: this.data.doubleLessonId
    };

    this.assignmentService.updateAssignment(this.data.id, requestObject)
      .subscribe((updatedAssignment) => {
        this.modalService.apply(updatedAssignment);
      }, error => this.alertService.error(error.error.data ? error.error.data : 'Bad request', 5000));
  }

}
