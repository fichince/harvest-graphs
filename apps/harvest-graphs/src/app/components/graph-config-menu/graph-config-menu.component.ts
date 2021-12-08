import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Option } from '../button-group/button-group.component';
import { Duration, GraphConfigService } from '../../services/graph-config.service';

@Component({
  selector: 'app-graph-config-menu',
  templateUrl: './graph-config-menu.component.html',
  styleUrls: ['./graph-config-menu.component.scss']
})
export class GraphConfigMenuComponent implements OnInit {

  timeDurationOptions : Option[] = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  duration : Duration = 'week';

  @Output()
  public onChange : EventEmitter<undefined>;

  constructor(private graphConfigService : GraphConfigService) { 
    this.onChange = new EventEmitter<undefined>();
  }

  ngOnInit(): void {
  }

  handleDuration(duration : string) {
    this.duration = duration as Duration;

    this.graphConfigService.setDuration(duration);
    this.onChange.emit();
  }

  handleTimeFrame(start : string) {
    this.graphConfigService.setStart(start);
    this.onChange.emit();
  }
}
