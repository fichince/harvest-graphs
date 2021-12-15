import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TimeEntry } from '../models/time-entry';
import * as _ from 'lodash';
import * as moment from 'moment';

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

  public toGraphOpts(timeEntries : TimeEntry[]) : EChartsOption {

    const xAxis = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

    const sums = _.chain(timeEntries)
      .groupBy((t) => moment(t.spent_date).day())
      .values()
      .map((entriesPerDay) => {
        return _.chain(entriesPerDay)
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
