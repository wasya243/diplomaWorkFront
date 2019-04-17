import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-week-bar-item',
  templateUrl: './week-bar-item.component.html',
  styleUrls: [ './week-bar-item.component.scss' ]
})
export class WeekBarItemComponent implements OnInit {

  @Input() week: any;
  @Input() isSelected: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
