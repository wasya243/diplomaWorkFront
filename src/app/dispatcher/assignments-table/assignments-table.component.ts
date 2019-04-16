import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';

import IAssignment = diploma.IAssignment;
import IDoubleLesson = diploma.IDoubleLesson;
import IGroup = diploma.IGroup;

@Component({
  selector: 'app-assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: [ './assignments-table.component.scss' ]
})
export class AssignmentsTableComponent implements OnInit {

  @Input() assignment: IAssignment;
  @Input() doubleLessons: Array<IDoubleLesson>;
  @Input() groups: Array<IGroup>;

  constructor() {
  }

  ngOnInit() {
  }

  getAssignment(doubleLesson: IDoubleLesson, group: IGroup) {
    const targetAssignment = this.assignment.assignments.find(assignment =>
      assignment.doubleLessonId === doubleLesson.id && assignment.groupId === group.id);

    return targetAssignment ? targetAssignment.classroom.number : '';
  }

  getDate(date: string) {
    return moment(date).format('dddd, YYYY-MM-DD');
  }

}
