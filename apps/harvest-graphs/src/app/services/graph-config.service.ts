import { Injectable } from '@angular/core';

export type Duration = 'week' | 'month' | 'year';

export type GraphConfig = {
  duration?: Duration,
  start?: string,
};

@Injectable({
  providedIn: 'root'
})
export class GraphConfigService {
  private config : GraphConfig;

  constructor() { 
    // TODO defaults?
    this.config = {
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
