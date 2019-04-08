import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormattingService } from '../../shared/formatting.service';

import IRequest = diploma.IRequest;

@Injectable()
export class RequestsService {

  private readonly dateFormat: string;

  constructor(
    private http: HttpClient,
    private formattingService: FormattingService
  ) {
    this.dateFormat = 'YYYY-MM-DD hh:mm a';
  }

  getRequests(): Observable<Array<IRequest>> {
    return this.http.get<IRequest[]>(`/requests`)
      .pipe(map((listOfRequests: Array<IRequest>) => {
        return listOfRequests.map(request => {
          request.createdAt = this.formattingService.formatDate(request.createdAt, this.dateFormat);
          request.start = this.formattingService.formatDate(request.start, this.dateFormat);
          request.end = this.formattingService.formatDate(request.end, this.dateFormat);

          return request;
        });
      }));
  }

  approveRequest(requestId: number, isApproved: boolean): Observable<IRequest> {
    return this.http.put<IRequest>(`/review-requests/${requestId}`, { isApproved });
  }
}
