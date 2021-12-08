import { Component, Input, OnChanges } from '@angular/core';
import { Duration } from '../../services/graph-config.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-time-frame-picker',
  templateUrl: './time-frame-picker.component.html',
  styleUrls: ['./time-frame-picker.component.scss']
})
export class TimeFramePickerComponent implements OnChanges {

  @Input()
  public duration : Duration = 'week';

  private start : Moment = moment();
  private end : Moment = moment();

  constructor() { 
  }

  ngOnChanges(): void {
    this.start.startOf(this.duration);
  }

  upperFirstDuration() : string {
    return _.upperFirst(this.duration);
  }
}
