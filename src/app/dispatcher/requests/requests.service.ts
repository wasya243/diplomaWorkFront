import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormattingService } from '../../shared/formatting.service';

import IRequest = diploma.IRequest;

@Injectable()
export class RequestsService {

  constructor(
    private http: HttpClient,
    private formattingService: FormattingService
  ) {
  }

  getRequests(): Observable<Array<IRequest>> {
    return this.http.get<IRequest[]>(`/requests`)
      .pipe(map((listOfRequests: Array<IRequest>) => {
        return listOfRequests.map(request => {
          request.createdAt = this.formattingService.formatDate(request.createdAt, 'YYYY-MM-DD hh:mm');
          request.start = this.formattingService.formatDate(request.start, 'YYYY-MM-DD hh:mm');
          request.end = this.formattingService.formatDate(request.end, 'YYYY-MM-DD hh:mm');

          return request;
        });
      }));
  }

  approveRequest(requestId: number, isApproved: boolean): Observable<IRequest> {
    return this.http.put<IRequest>(`/review-requests/${requestId}`, { isApproved });
  }
}
