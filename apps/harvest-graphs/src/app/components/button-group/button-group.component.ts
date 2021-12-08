import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

export type Option = {
  value: string,
  label: string,
};

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  private selected : string = '';

  @Input() 
  public options : Option[];

  @Input()
  public defaultValue : string;

  @Output() 
  public onClick : EventEmitter<string>;

  public classes : any[];

  constructor() { 
    this.options = [];
    this.onClick = new EventEmitter<string>();
    this.classes = [];
    this.defaultValue = '';
  }

  ngOnInit() {
    if (this.defaultValue) {
      this.selected = this.defaultValue;
    }
    this.updateClasses();
  }

  updateClasses() {
    this.classes = _.map(this.options, (opt) => {
      return {
        'button': true,
        'button-default': this.selected !== opt.value,
        'button-selected': this.selected === opt.value
      };
    });
  }

  handleClick(s : string) {
    this.selected = s;
    this.onClick.emit(this.selected);
    this.updateClasses();
  }
}
