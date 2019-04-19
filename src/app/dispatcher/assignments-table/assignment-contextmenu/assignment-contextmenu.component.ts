import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import IContextMenuAssignment = diploma.IContextMenuAssignment;
import IDoubleLesson = diploma.IDoubleLesson;

@Component({
  selector: 'app-assignment-contextmenu',
  templateUrl: './assignment-contextmenu.component.html',
  styleUrls: [ './assignment-contextmenu.component.scss' ]
})
export class AssignmentContextmenuComponent implements OnInit {

  // coordinates to display modal
  @Input() x: number;
  @Input() y: number;

  // this data is used to remove chosen assignment
  @Input() assignment: IContextMenuAssignment;
  @Output() deleteAssignment = new EventEmitter<any>();

  // this data is used to fetch available classrooms by given date, double lesson
  @Input() doubleLesson: IDoubleLesson;
  @Input() assignmentDate: string;
  @Output() getAvailableClassrooms = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onDeleteAssignment() {
    if (this.assignment.classroom.number) {
      this.deleteAssignment.emit(this.assignment);
    }
  }

  onGetAvailableClassrooms() {
    const objectToEmit = {
      doubleLesson: this.doubleLesson,
      assignmentDate: this.assignmentDate
    };
    this.getAvailableClassrooms.emit(objectToEmit);
  }

}
