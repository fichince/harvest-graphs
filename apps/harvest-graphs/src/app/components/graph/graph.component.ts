import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TimeEntry } from '../../models/time-entry';
import { EChartsOption } from 'echarts';
import { GraphService } from '../../services/graph.service';

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

  constructor(private graphService : GraphService) { }

  ngOnInit(): void {
  }

  ngOnChanges() : void {
    // TODO convert timeEntries to graphOpts
    this.graphOpts = this.graphService.toGraphOpts(this.timeEntries);
  }

}
