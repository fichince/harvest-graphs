import { TimeConversionService } from './time-conversion.service';
import { expect } from '../../test/test-utils';

describe('TimeConversionService', () => {

  let service : TimeConversionService;

  beforeEach(() => {
    service = new TimeConversionService();
  });

  it('should convert time and duration to timestamps', () => {
    expect(service.convertToTimestamps('2021-10-07', 'week')).to.deep.equal({
      from: '2021-10-03', 
      to: '2021-10-09'
    });

    expect(service.convertToTimestamps('2021-10-07', 'month')).to.deep.equal({
      from: '2021-10-01', 
      to: '2021-10-31'
    });

    expect(service.convertToTimestamps('2021-10-07', 'year')).to.deep.equal({
      from: '2021-01-01', 
      to: '2021-12-31'
    });
  });
});
