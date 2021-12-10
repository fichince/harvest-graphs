import { Injectable } from '@angular/core';
import * as moment from 'moment';

export type Duration = 'week' | 'month' | 'year';

export type GraphConfig = {
  duration: Duration,
  start: string,
};

@Injectable({
  providedIn: 'root'
})
export class GraphConfigService {
  private config : GraphConfig;

  constructor() { 
    this.config = {
      start: moment().startOf('week').format('YYYY-MM-DD'),
      duration: 'week',
    };
  }

  setDuration(d : string) {
    if (d === 'week' || d === 'month' || d === 'year') {
      this.config.duration = d;
    } else {
      this.config.duration = 'week';
    }
  }

  setStart(start: string) {
    this.config.start = start;
  }

  getConfig() {
    return this.config;
  }
}
