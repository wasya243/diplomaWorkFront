import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import IContextMenuAssignment = diploma.IContextMenuAssignment;

@Component({
  selector: 'app-assignment-contextmenu',
  templateUrl: './assignment-contextmenu.component.html',
  styleUrls: [ './assignment-contextmenu.component.scss' ]
})
export class AssignmentContextmenuComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() assignment: IContextMenuAssignment;
  @Output() deleteAssignment = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onDeleteAssignment() {
    if (this.assignment.classroom.number) {
      this.deleteAssignment.emit(this.assignment);
    }
  }

}
