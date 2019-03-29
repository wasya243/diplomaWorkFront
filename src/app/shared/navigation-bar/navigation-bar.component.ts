import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import INavigationBarConfig = diploma.INavigationBarConfig;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: [ './navigation-bar.component.scss' ]
})
export class NavigationBarComponent implements OnInit {

  @Input() navigationBarConfig: INavigationBarConfig;
  @Input() isSelected: boolean;
  @Output() addItem = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onAdd(): void {
    this.addItem.emit(this.navigationBarConfig.modalToInvoke);
  }

}
