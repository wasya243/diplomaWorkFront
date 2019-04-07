import { Component, OnInit } from '@angular/core';
import { faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { ModalService } from '../../shared/modal/modal.service';
import { IGridSortableColumnData } from '../../shared/grid/grid.module';
import { RegistrationRequestsService } from './registration-requests.service';
import { PermitRegistrationRequestComponent } from './permit-registration-request/permit-registration-request.component';
import { ReviewRegistrationRequestModalComponent } from './review-registration-request-modal/review-registration-request-modal.component';

import IRegistrationRequest = diploma.IRegistrationRequest;

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: [ './registration-requests.component.scss' ]
})
export class RegistrationRequestsComponent implements OnInit {

  registrationRequests: {
    items: Array<IRegistrationRequest>,
    metadata?: any
  } = {
    items: []
  };
  thumbsUpIcon = faThumbsUp;
  searchIcon = faSearch;

  constructor(
    private registrationRequestsService: RegistrationRequestsService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.registrationRequestsService.getRegistrationRequests()
      .subscribe(data => {
        this.registrationRequests.items = data;
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
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

  onPermit(clickedRow: IRegistrationRequest) {
    this.modalService.open(PermitRegistrationRequestComponent, { size: 'sm' }, clickedRow)
      .then(requestId => {
        this.registrationRequests.items = this.registrationRequests.items.filter(item => item.id !== requestId);
      }).catch(error => {
      console.error(error);
    });
  }

  onReview(clickedRow: IRegistrationRequest) {
    this.modalService.open(ReviewRegistrationRequestModalComponent, { size: 'sm' }, clickedRow)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

}
