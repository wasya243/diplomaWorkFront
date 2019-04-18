import { Component, OnInit } from '@angular/core';
import { forkJoin, from } from 'rxjs';
import * as moment from 'moment-timezone';
import { mergeMap } from 'rxjs/operators';

import { DoubleLessonsService } from '../../shared/double-lessons.service';
import { GroupsService } from '../../shared/groups.service';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentModalComponent } from './create-assignment-modal/create-assignment-modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { WeeksService } from './weeks.service';

import IAssignment = diploma.IAssignment;
import ICreatedAssignment = diploma.ICreatedAssignment;
import IDoubleLesson = diploma.IDoubleLesson;
import IGroup = diploma.IGroup;
import IWeek = diploma.IWeek;

@Component({
  selector: 'app-assign-classes',
  templateUrl: './assign-classes.component.html',
  styleUrls: [ './assign-classes.component.scss' ]
})
export class AssignClassesComponent implements OnInit {

  assignments: Array<IAssignment>;
  doubleLessons: Array<IDoubleLesson>;
  groups: Array<IGroup>;
  weeks: Array<IWeek>;
  selectedWeek: IWeek;

  constructor(
    private groupsService: GroupsService,
    private doubleLessonsService: DoubleLessonsService,
    private assignmentsService: AssignmentsService,
    private weeksService: WeeksService,
    private modalService: ModalService
  ) {
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
    return this.groupsService.getGroups();
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
