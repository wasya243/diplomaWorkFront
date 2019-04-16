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

  constructor(
    private groupsService: GroupsService,
    private doubleLessonsService: DoubleLessonsService,
    private assignmentsService: AssignmentsService
  ) {
  }

  ngOnInit() {
    this.fetchData().subscribe((response) => {
      this.assignments = response[ 0 ];
      this.doubleLessons = response[ 1 ];
      this.groups = response[ 2 ];
    }, error => console.error(error));
  }

  private fetchData() {
    return forkJoin(this.getAssignments(), this.getDoubleLessons(), this.getGroups());
  }

  private getGroups() {
    return this.groupsService.getGroups();
  }

  private getDoubleLessons() {
    return this.doubleLessonsService.getDoubleLessons();
  }

  private getAssignments() {
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

    return this.assignmentsService.getAssignments(monday, friday);
  }
}
