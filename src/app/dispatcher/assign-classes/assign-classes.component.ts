import { Component, OnInit } from '@angular/core';
import { forkJoin, from } from 'rxjs';
import * as moment from 'moment-timezone';
import { mergeMap } from 'rxjs/operators';

import { DoubleLessonsService } from '../../shared/double-lessons.service';
import { GroupsService } from '../../shared/groups.service';
import { ClassroomsService } from '../../shared/classrooms.service';
import { GetAvailableClassroomsModalComponent } from './get-available-classrooms-modal/get-available-classrooms-modal.component';
import { CreateAssignmentModalComponent } from './create-assignment-modal/create-assignment-modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { WeeksService } from './weeks.service';
import { AlertService } from '../../shared/alert/alert.service';

import IAssignment = diploma.IAssignment;
import ICreatedAssignment = diploma.ICreatedAssignment;
import IDoubleLesson = diploma.IDoubleLesson;
import IGroup = diploma.IGroup;
import IContextMenuAssignment = diploma.IContextMenuAssignment;
import IWeek = diploma.IWeek;
import IClassroom = diploma.IClassroom;
import IUserData = diploma.IUserData;
import { StorageService } from '../../core/storage.service';
import { AssignmentsService } from './assignments.service';

@Component({
  selector: 'app-assign-classes',
  templateUrl: './assign-classes.component.html',
  styleUrls: [ './assign-classes.component.scss' ]
})
export class AssignClassesComponent implements OnInit {

  assignments: Array<IAssignment> = [];
  doubleLessons: Array<IDoubleLesson> = [];
  groups: Array<IGroup> = [];
  weeks: Array<IWeek> = [];
  selectedWeek: IWeek;
  freeClassrooms: Array<IClassroom> = [];
  // this props is used to display info in free classrooms list header
  assignmentDateFreeClassrooms: string;
  doubleLessonNumberFreeClassrooms: number;
  // this is used to fetch appropriate groups
  userData: IUserData;
  // offset y for context menu
  offsetY = 0;

  constructor(
    private groupsService: GroupsService,
    private doubleLessonsService: DoubleLessonsService,
    private weeksService: WeeksService,
    private modalService: ModalService,
    private classroomsService: ClassroomsService,
    private storageService: StorageService,
    private assignmentsService: AssignmentsService
  ) {
    this.userData = this.storageService.get('user', true) as IUserData;
  }

  ngOnInit() {
    // TODO: get current day instead of hardcoding it
    const dayFromLastWeek = '2019-04-09T00:00:00+03:00';

    const monday = moment(dayFromLastWeek)
      .startOf('week')
      .add(1, 'days')
      .format('YYYY-MM-DD');

    const friday = moment(dayFromLastWeek)
      .startOf('week')
      .add(5, 'days')
      .format('YYYY-MM-DD');

    this.fetchData(monday, friday).subscribe((response) => {
      this.assignments = response[ 0 ];
      this.doubleLessons = response[ 1 ];
      this.groups = response[ 2 ];
      this.weeks = response[ 3 ];
      this.selectedWeek = this.weeks[ 0 ];
    }, error => console.error(error));

    // TODO: avoid subscribe inside subscribe
    this.assignmentsService.onInitAssignmentCreationSubject().subscribe(async () => {
      this.modalService.open(CreateAssignmentModalComponent, { size: 'lg' })
        .then((createdAssignment: ICreatedAssignment) => {
          const { start, end } = this.getFormattedStartEnd(this.selectedWeek.start, this.selectedWeek.end);
          this.getAssignments(start, end).subscribe((assignments) => {
            this.assignments = assignments;
          });
        })
        .catch(error => console.error(error));
    });
    // TODO: clarify what kind of error occurs here
    // this.assignmentsService.onInitAssignmentCreationSubject().pipe(
    //   mergeMap(() => {
    //     console.log('open modal');
    //     return from(this.modalService.open(CreateAssignmentModalComponent, { size: 'lg' }));
    //   }),
    //   mergeMap((createdAssignment: ICreatedAssignment) => {
    //     console.log('refetch assignments');
    //     const { start, end } = this.getFormattedStartEnd(this.selectedWeek.start, this.selectedWeek.end);
    //     return this.getAssignments(start, end);
    //   })
    // ).subscribe((assignments) => {
    //   this.assignments = assignments;
    // }, error => console.error(error));
  }

  onScroll(event) {
    const tableContainer = event.target;
    this.offsetY = tableContainer.scrollTop;
  }

  selectWeek(week) {
    this.selectedWeek = week;

    const { start, end } = this.getFormattedStartEnd(this.selectedWeek.start, this.selectedWeek.end);

    this.getAssignments(start, end).subscribe((response) => {
      this.assignments = response;
    }, error => console.error(error));
  }

  isSelected(week) {
    return this.selectedWeek.id === week.id;
  }

  canDisplayTooltip() {
    return this.doubleLessonNumberFreeClassrooms && this.assignmentDateFreeClassrooms;
  }

  onRemoveAssignment(data: IContextMenuAssignment) {
    this.assignmentsService.removeAssignment(data.id).subscribe(() => {
      const { start, end } = this.getFormattedStartEnd(this.selectedWeek.start, this.selectedWeek.end);
      this.getAssignments(start, end).subscribe((assignments) => {
        this.assignments = assignments;
      });
    }, error => console.error(error));
  }

  onGetAvailableClassrooms(data: { assignmentDate: string, doubleLesson: IDoubleLesson }) {
    this.modalService.open(GetAvailableClassroomsModalComponent, { size: 'lg' }, data)
      .then((res) => {
        this.classroomsService.getFreeClassrooms(res.facultyId, res.doubleLessonId, res.assignmentDate, res.amountOfSeats)
          .subscribe(classrooms => {
            this.assignmentDateFreeClassrooms = moment(data.assignmentDate).format('YYYY-MM-DD');
            this.doubleLessonNumberFreeClassrooms = data.doubleLesson.number;
            this.freeClassrooms = classrooms;
          }, error => console.error(error));
      });
  }

  private getFormattedStartEnd(start: string, end: string): { start: string, end: string } {
    return {
      start: moment(start).format('YYYY-MM-DD'),
      end: moment(end).format('YYYY-MM-DD')
    };
  }

  private fetchData(start: string, end: string) {
    // TODO: implement functionality to choose term instead of hardcoding it
    const termId = 1;

    return forkJoin(
      this.getAssignments(start, end),
      this.getDoubleLessons(),
      this.getGroups(),
      this.getWeeksByTerm(termId)
    );
  }

  private getGroups() {
    return this.groupsService.getGroupsByFaculty(this.userData.userInfo.facultyId);
  }

  private getDoubleLessons() {
    return this.doubleLessonsService.getDoubleLessons();
  }

  private getAssignments(start: string, end: string) {
    return this.assignmentsService.getAssignments(start, end);
  }

  private getWeeksByTerm(termId: number) {
    return this.weeksService.getWeeksByTerm(termId);
  }
}
