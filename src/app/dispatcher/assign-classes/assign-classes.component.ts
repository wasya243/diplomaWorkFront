import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as moment from 'moment-timezone';

import { DoubleLessonsService } from '../../shared/double-lessons.service';
import { GroupsService } from '../../shared/groups.service';
import { AssignmentsService } from './assignments.service';
import { WeeksService } from './weeks.service';

import IAssignment = diploma.IAssignment;
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
    private weeksService: WeeksService
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
  }

  selectWeek(week) {
    this.selectedWeek = week;

    const start = moment(this.selectedWeek.start).format('YYYY-MM-DD');
    const end = moment(this.selectedWeek.end).format('YYYY-MM-DD');

    this.getAssignments(start, end).subscribe((response) => {
      this.assignments = response;
    }, error => console.error(error));
  }

  isSelected(week) {
    return this.selectedWeek.id === week.id;
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
