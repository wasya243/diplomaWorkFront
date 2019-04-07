import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class FormattingService {

  constructor() {
  }

  formatDate(date: string, format: string): string {
    let formattedDate = '';
    try {
      formattedDate = moment(date).format(format);
    } catch (error) {
      console.error(error);
      formattedDate = date;
    }

    return formattedDate;
  }
}
