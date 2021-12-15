import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TimeEntry } from '../../models/time-entry';
import { EChartsOption } from 'echarts';
import { GraphService } from '../../services/graph.service';
import { GraphConfigService } from '../../services/graph-config.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnChanges {

  @Input()
  timeEntries : TimeEntry[] = [];

  graphOpts : EChartsOption = {};

  initOpts : any = {
    renderer: 'svg'
  };

  constructor(
    private graphService : GraphService,
    private graphConfigService : GraphConfigService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() : void {
    this.graphOpts = this.graphService.toGraphOpts(this.timeEntries, this.graphConfigService.getConfig());
  }

}
