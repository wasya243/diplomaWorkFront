import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { FacultiesService } from '../../shared/faculties.service';
import { ClassroomsService } from '../../shared/classrooms.service';

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
  },
  {
    headerName: 'Classrooms',
    labelName: 'Classroom list',
    buttonName: 'Add classroom',
    routeName: 'classrooms',
    routeNavigateTo: '../admin/classrooms',
    modalToInvoke: 'createClassroomModal'
  },
  {
    headerName: 'Requests',
    labelName: 'Requests list',
    buttonName: 'Add request',
    routeName: 'requests',
    routeNavigateTo: '../admin/requests',
    modalToInvoke: 'createRequestModal'
  },
  {
    headerName: 'Groups',
    labelName: 'Groups list',
    buttonName: 'Add group',
    routeName: 'groups',
    routeNavigateTo: '../admin/groups',
    modalToInvoke: 'createGroupModal'
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

  constructor(
    private router: Router,
    private facultiesService: FacultiesService,
    private classroomsService: ClassroomsService
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
    // TODO: implement remaining modals
    switch (modalName) {
      case 'createFacultyModal':
        this.facultiesService.initFacultyCreation();
        break;
      case 'createClassroomModal':
        this.classroomsService.initClassroomCreation();
        break;
      case 'createUserModal':
        console.log(modalName);
        break;
    }
  }

}
