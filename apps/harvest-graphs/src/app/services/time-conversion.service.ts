import { Injectable } from '@angular/core';
import { Duration } from './graph-config.service';
import * as moment from 'moment';

export type Timestamps = {
  from: string,
  to: string,
}

@Injectable({
  providedIn: 'root'
})
export class TimeConversionService {

  constructor() { }

  public convertToTimestamps(start: string, duration: Duration) : Timestamps {

    const from = moment(start).startOf(duration);
    const to = from.clone().endOf(duration);

    return { 
      from: from.format('YYYY-MM-DD'), 
      to: to.format('YYYY-MM-DD'),
    };

  } 
}
