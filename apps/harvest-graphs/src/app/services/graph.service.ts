import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TimeEntry } from '../models/time-entry';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { Duration, GraphConfig } from './graph-config.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  /*
    {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25],
          stack: 'foo',
        },
        {
          type: 'bar',
          data: [100, 200, 300, 400, 500, 100, 20],
          stack: 'foo'
        }
      ],
    }
  */

  constructor() { }

  private getXAxis(config : GraphConfig) : string[] {

    const { duration, start } = config;

    const startDate = dayjs(start).startOf(duration);
    const endDate = dayjs(start).endOf(duration);

    switch(duration) {
      case 'week':
      case 'month': {
        const items = [];
        let d = startDate.clone();
        while (d.isBefore(endDate, 'day') || d.isSame(endDate, 'day')) {
          items.push(d.format('ddd MMM D'));
          d = d.add(1, 'day');
        }
        return items;
      }
      case 'year': {
        return _.map(_.range(0, 12), (month) => {
          const d = dayjs().year(startDate.year()).month(month);
          console.log('month', month, d);
          return d.format('MMM YYYY');
        });
      }
    }
  }

  private groupTimeEntriesByTime(date : dayjs.Dayjs, config : GraphConfig) : number {
    switch (config.duration) {
      case 'week':
        // day of the week
        return date.day();
      case 'month':
        // day of the month
        return date.date();
      case 'year':
        // month of the year
        return date.month();

    }
  }

  public toGraphOpts(timeEntries : TimeEntry[], config : GraphConfig) : EChartsOption {

    const xAxis = this.getXAxis(config);

    const sums = _.chain(timeEntries)
      .groupBy((t) => this.groupTimeEntriesByTime(dayjs(t.spent_date), config))
      .mapValues((entriesInTimePeriod) => {
        return _.chain(entriesInTimePeriod)
          .groupBy((t) => t.project?.id)
          .mapValues((entriesPerProject) => {
            return _.reduce(entriesPerProject, (acc, t) => acc + (t.hours || 0), 0);
          }).value()
      })
      .value();

    console.log('sums', JSON.stringify(sums, null, 2));
    
    const series : any = {};

    _.each(sums, (groupedSums, index) => {
      _.each(_.keys(groupedSums), (groupKey) => {
        const sum = groupedSums[groupKey];
        if (!series[groupKey]) {
          series[groupKey] = new Array(xAxis.length);
          _.fill(series[groupKey], 0);
        }
        series[groupKey][index] = sum;
      });
    });

    console.log('series', series);

    // each array in series represents one project

    return {
      xAxis: { data: xAxis },
      yAxis: {},
      series: _.map(series, (s) => ({ type: 'bar', data: s, stack: 'project' }))
    };
  }
}
