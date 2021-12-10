import { Component } from '@angular/core';
import { TimeEntry } from './models/time-entry';
import { ApiService } from './services/api.service';
import { GraphConfigService } from './services/graph-config.service';
import { TimeConversionService } from './services/time-conversion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  timeEntries : TimeEntry[] = [];

  constructor(
    private api : ApiService,
    private graphConfigService : GraphConfigService,
    private timeConversionService : TimeConversionService,
  ) { }

  format() {
    return JSON.stringify(this.timeEntries, null, 2);
  }

  async handleConfigChange() {
    const { start, duration } = this.graphConfigService.getConfig();
    const { from, to } = this.timeConversionService.convertToTimestamps(start, duration);

    this.timeEntries = await this.api.getTimeEntries(from, to);
  }
}
