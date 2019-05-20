import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment-timezone';

import IAssignment = diploma.IAssignment;
import IContextMenuAssignment = diploma.IContextMenuAssignment;
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
  @Input() offsetY = 0;
  @Output() removeAssignment = new EventEmitter<IContextMenuAssignment>();
  @Output() updateAssignment = new EventEmitter<IContextMenuAssignment>();
  @Output() getAvailableClassrooms = new EventEmitter<any>();

  selectedDoubleLesson: IDoubleLesson;
  selectedAssignment: any;
  contextmenu = false;
  contextmenuY = 0;
  contextmenuX = 0;

  constructor() {
  }

  ngOnInit() {
  }

  getAssignment(doubleLesson: IDoubleLesson, group: IGroup) {
    return this.assignment.assignments.find(assignment =>
      assignment.doubleLessonId === doubleLesson.id && assignment.groupId === group.id) || { classroom: {} };
  }

  disableContextMenu() {
    this.contextmenu = false;
  }

  getDate(date: string) {
    return moment(date).format('dddd, YYYY-MM-DD');
  }

  onRightClick(event, group: IGroup, doubleLesson: IDoubleLesson, assignment?: any) {
    this.contextmenuX = event.x - 250;
    this.contextmenuY = event.y - 130 + this.offsetY;
    this.selectedDoubleLesson = doubleLesson;
    this.selectedAssignment = Object.assign(assignment, { assignmentDate: this.assignment.assignmentDate });
    this.contextmenu = true;
  }

  onDeleteAssignment(data) {
    this.removeAssignment.emit(data);
  }

  onUpdateAssignment(data) {
    this.updateAssignment.emit(data);
  }

  onGetAvailableClassrooms(data) {
    this.getAvailableClassrooms.emit(data);
  }

}
