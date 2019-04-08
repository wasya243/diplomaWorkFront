import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class FormattingService {

  constructor() {
  }

  formatDate(date: string, format: string): string {
    let formattedDate = '';
    try {
      const tz = moment.tz.guess();
      formattedDate = moment(date).tz(tz).format(format);
    } catch (error) {
      console.error(error);
      formattedDate = date;
    }

    return formattedDate;
  }
}
