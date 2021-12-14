import { TimeEntry } from '../models/time-entry';
import { GraphService } from './graph.service';
import { expect } from '../../test/test-utils';

describe('GraphService', () => {

  beforeEach(() => {
  });

  it('should group entries by day and project', () => {

    const service = new GraphService();

    const client = { id: 1, name: 'Client1' };
    const projectA = { id: 1, name: 'Project A' };
    const projectB = { id: 2, name: 'Project B' };
    const projectC = { id: 3, name: 'Project C' };
    const task = { id: 1, name: 'Task 1' };

    const timeEntries : TimeEntry[] = [
      {
        id: 1,
        spent_date: '2021-12-05',
        billable: true,
        hours: 1.5,
        client,
        project: projectA,
        task
      },
      {
        id: 2,
        spent_date: '2021-12-05',
        billable: true,
        hours: 2,
        client,
        project: projectB,
        task
      },
      {
        id: 3,
        spent_date: '2021-12-05',
        billable: true,
        hours: 3,
        client,
        project: projectB,
        task
      },
      {
        id: 4,
        spent_date: '2021-12-06',
        billable: true,
        hours: 3,
        client,
        project: projectA,
        task
      },
      {
        id: 5,
        spent_date: '2021-12-06',
        billable: true,
        hours: 3,
        client,
        project: projectC,
        task
      },
    ];

    console.log('timeEntries', JSON.stringify(timeEntries, null, 2));

    const result = service.toGraphOpts(timeEntries);
    console.log('result', JSON.stringify(result, null, 2));

    expect(result.series).to.deep.equal([
      {
        type: 'bar',
        data: [1.5, 3, 0, 0, 0, 0, 0],
        stack: 'project',
      },
      {
        type: 'bar',
        data: [5, 0, 0, 0, 0, 0, 0],
        stack: 'project',
      },
      {
        type: 'bar',
        data: [0, 3, 0, 0, 0, 0, 0],
        stack: 'project',
      },
    ]);
  });

});
