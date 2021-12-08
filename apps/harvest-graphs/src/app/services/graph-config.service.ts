import { Injectable } from '@angular/core';

export type Duration = 'week' | 'month' | 'year';

export type GraphConfig = {
  duration?: Duration,
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

  getConfig() {
    console.log('getConfig', this.config);
    return this.config;
  }
}
