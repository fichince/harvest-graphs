import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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

  @Output()
  public onChange : EventEmitter<string> = 
    new EventEmitter<string>();

  private distance : number = 0;

  private init : Moment = moment();
  private current : Moment = moment();

  //private end : Moment = moment();

  constructor() { }

  updateCurrent() {
    this.current = this.init.clone()
      .startOf(this.duration)
      .add(this.distance, this.duration);

    this.onChange.emit(this.format());
  }

  isPresentTimeFrame() : boolean {
    return this.distance === 0;
  }

  inc() { 
    this.distance++; 
    this.updateCurrent();
  }
  dec() { 
    this.distance--; 
    this.updateCurrent();
  }

  format() : string {
    return this.current.format('YYYY-MM-DD');
  }

  ngOnChanges(): void {
    this.current = this.init.clone().startOf(this.duration);
    this.onChange.emit(this.format());
  }

  upperFirstDuration() : string {
    return _.upperFirst(this.duration);
  }

  timeFrameDescription() : string {
    if (this.distance === 0) {
      return `This ${this.upperFirstDuration()}`;
    } else if (this.distance === -1) {
      return `Last ${this.upperFirstDuration()}`;
    } else {
      return `${Math.abs(this.distance)} ${this.upperFirstDuration()}s Ago`;
    }
  }
}
