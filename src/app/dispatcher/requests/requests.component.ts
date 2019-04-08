import { Component, OnInit } from '@angular/core';
import { faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { IGridSortableColumnData } from '../../shared/grid/grid.module';
import { RequestsService } from './requests.service';
import { ModalService } from '../../shared/modal/modal.service';
import { ReviewRequestModalComponent } from './review-request-modal/review-request-modal.component';
import { ApproveRequestModalComponent } from './approve-request-modal/approve-request-modal.component';
import { CreateRequestModalComponent } from './create-request-modal/create-request-modal.component';

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

  thumbsUpIcon = faThumbsUp;
  searchIcon = faSearch;

  constructor(
    private requestService: RequestsService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.getRequests();
    this.requestService.onInitRequestCreationSubject().subscribe(async () => {
      this.modalService.open(CreateRequestModalComponent, { size: 'lg' })
        .then(() => {
          this.getRequests();
        })
        .catch(error => console.error(error));
    });
  }

  onSortChange(sortData: IGridSortableColumnData) {
    console.log(sortData);
    // TODO: return back when respective functionality is implemented on the backend
    // this.usersService.getUsers(sortData)
    //   .subscribe(data => {
    //     this.users.items = data;
    //   });
  }

  onPermit(clickedRow: IRequest) {
    this.modalService.open(ApproveRequestModalComponent, { size: 'sm' }, clickedRow)
      .then(requestId => {
        this.requests.items = this.requests.items.map(item =>
          item.id === requestId ? Object.assign(item, { isApproved: true }) : item
        );
      }).catch(error => {
      console.error(error);
    });
  }

  onReview(clickedRow: IRequest) {
    this.modalService.open(ReviewRequestModalComponent, { size: 'sm' }, clickedRow)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
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
