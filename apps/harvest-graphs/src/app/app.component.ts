import { Component } from '@angular/core';
import { TimeEntry } from './models/time-entry';
import { ApiService } from './services/api.service';
import { GraphConfigService } from './services/graph-config.service';

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
  ) { }

  format() {
    return JSON.stringify(this.timeEntries, null, 2);
  }

  async handleConfigChange() {
    const { start, duration } = this.graphConfigService.getConfig();

    this.timeEntries = await this.api.getTimeEntries(start, duration);
  }
}
