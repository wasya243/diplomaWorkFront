import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assignment-contextmenu',
  templateUrl: './assignment-contextmenu.component.html',
  styleUrls: [ './assignment-contextmenu.component.scss' ]
})
export class AssignmentContextmenuComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;

  constructor() {
  }

  ngOnInit() {
  }

}
