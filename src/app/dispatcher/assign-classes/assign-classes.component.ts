import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as moment from 'moment-timezone';

import { DoubleLessonsService } from '../../shared/double-lessons.service';
import { GroupsService } from '../../shared/groups.service';
import { AssignmentsService } from './assignments.service';

import IAssignment = diploma.IAssignment;
import IDoubleLesson = diploma.IDoubleLesson;
import IGroup = diploma.IGroup;


@Component({
  selector: 'app-assign-classes',
  templateUrl: './assign-classes.component.html',
  styleUrls: [ './assign-classes.component.scss' ]
})
export class AssignClassesComponent implements OnInit {

  assignments: Array<IAssignment>;
  doubleLessons: Array<IDoubleLesson>;
  groups: Array<IGroup>;
  weeks: Array<any>;
  selectedWeek: any;

  constructor(
    private groupsService: GroupsService,
    private doubleLessonsService: DoubleLessonsService,
    private assignmentsService: AssignmentsService
  ) {
    this.weeks = [
      {
        id: 1,
        number: 1,
        start: '2019-04-08T00:00:00+03:00',
        end: '2019-04-12T00:00:00+03:00'
      },
      {
        id: 2,
        number: 2,
        start: '2019-04-15T00:00:00+03:00',
        end: '2019-04-19T00:00:00+03:00'
      },
      {
        id: 3,
        number: 3,
        start: '2019-04-22T00:00:00+03:00',
        end: '2019-04-26T00:00:00+03:00'
      },
      {
        id: 4,
        number: 4,
        start: '2019-04-29T00:00:00+03:00',
        end: '2019-05-03T00:00:00+03:00'
      },
      {
        id: 5,
        number: 5,
        start: '2019-05-06T00:00:00+03:00',
        end: '2019-05-10T00:00:00+03:00'
      }
    ];
    this.selectedWeek = this.weeks[ 0 ];
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
    return forkJoin(this.getAssignments(start, end), this.getDoubleLessons(), this.getGroups());
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
}
