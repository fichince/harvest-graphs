import { Component, OnInit } from '@angular/core';
import { TimeEntry } from './models/time-entry';
import { ApiService } from './services/api.service';
import { GraphConfig, GraphConfigService } from './services/graph-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stringifiedConfig : string;

  private graphConfig : GraphConfig;

  constructor(
    private api : ApiService,
    private graphConfigService : GraphConfigService,
  ) {
    this.graphConfig = graphConfigService.getConfig();
    this.stringifiedConfig = '';
  }

  ngOnInit() {
    /*
    this.api.getTimeEntries().subscribe((time_entries : TimeEntry[]) => {
      console.log('here', time_entries);
    });
    */
  }

  handleConfigChange() {
    this.graphConfig = this.graphConfigService.getConfig();
    this.stringifiedConfig = JSON.stringify(this.graphConfig, null, 2);
  }
}
