import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

import { RequestsService } from '../requests/requests.service';

import INavigationBarConfig = diploma.INavigationBarConfig;

const navigationConfigs: INavigationBarConfig[] = [
  {
    headerName: 'Assign classroom',
    labelName: 'Assignments list',
    buttonName: 'Add assignment',
    routeName: 'assign-classes',
    routeNavigateTo: '../dispatcher/assign-classes',
    modalToInvoke: 'createAssignmentModal'
  },
  {
    headerName: 'Requests',
    labelName: 'Requests list',
    buttonName: 'Add request',
    routeName: 'requests',
    routeNavigateTo: '../dispatcher/requests',
    modalToInvoke: 'createRequestModal'
  }
];

@Component({
  selector: 'app-dispatcher-container',
  templateUrl: './dispatcher-container.component.html',
  styleUrls: [ './dispatcher-container.component.scss' ]
})
export class DispatcherContainerComponent implements OnInit {

  navigationConfigs: INavigationBarConfig[] = navigationConfigs;
  currentRoute: string;

  constructor(
    private router: Router,
    private requestsService: RequestsService
  ) {
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
    switch (modalName) {
      case 'createRequestModal':
        this.requestsService.initRequestCreation();
        break;
    }
  }

}
