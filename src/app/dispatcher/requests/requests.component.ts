import { Component, OnInit } from '@angular/core';

import { IGridSortableColumnData } from '../../shared/grid/grid.module';
import { RequestsService } from './requests.service';

import IRequest = diploma.IRequest;

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: [ './requests.component.scss' ]
})
export class RequestsComponent implements OnInit {

  requests: {
    items: Array<IRequest>,
    metadata?: any
  } = {
    items: []
  };

  constructor(private requestService: RequestsService) {
  }

  ngOnInit() {
    this.getRequests();
  }

  onSortChange(sortData: IGridSortableColumnData) {
    console.log(sortData);
    // TODO: return back when respective functionality is implemented on the backend
    // this.usersService.getUsers(sortData)
    //   .subscribe(data => {
    //     this.users.items = data;
    //   });
  }

  private getRequests(): void {
    this.requestService.getRequests()
      .subscribe(data => {
        this.requests.items = data;
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
