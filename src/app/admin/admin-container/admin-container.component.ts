import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import INavigationBarConfig = diploma.INavigationBarConfig;

const navigationConfigs: INavigationBarConfig[] = [
  {
    headerName: 'Faculties',
    labelName: 'Faculties list',
    buttonName: 'Add faculty',
    routeName: 'faculties',
    routeNavigateTo: '../admin/faculties',
    modalToInvoke: 'createFacultyModal'
  },
  {
    headerName: 'Users',
    labelName: 'Users list',
    buttonName: 'Add user',
    routeName: 'users',
    routeNavigateTo: '../admin/users',
    modalToInvoke: 'createUserModal'
  }
];


@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: [ './admin-container.component.scss' ]
})
export class AdminContainerComponent implements OnInit {

  navigationConfigs: INavigationBarConfig[] = navigationConfigs;
  currentRoute: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url.split('/')[ 2 ];
      }
    });
  }

  ngOnInit() {
  }

  onAddItem(modalName: string): void {
    // TODO: implement modals
    console.log(modalName);
  }

}
