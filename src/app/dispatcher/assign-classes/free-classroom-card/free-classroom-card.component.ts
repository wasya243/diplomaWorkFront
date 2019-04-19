import { Component, OnInit, Input } from '@angular/core';

import IClassroom = diploma.IClassroom;

@Component({
  selector: 'app-free-classroom-card',
  templateUrl: './free-classroom-card.component.html',
  styleUrls: [ './free-classroom-card.component.scss' ]
})
export class FreeClassroomCardComponent implements OnInit {

  @Input() classroom: IClassroom;

  constructor() {
  }

  ngOnInit() {
  }

}
