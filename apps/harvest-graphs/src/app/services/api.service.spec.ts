import { ApiService } from './api.service';
import * as sinon from 'sinon';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TimeEntryResponse } from '../models/paginated-response';
import { expect } from '../../test/test-utils';

describe('ApiService', () => {

  const sandbox = sinon.createSandbox();

  let httpClientMock : sinon.SinonStubbedInstance<HttpClient>;

  const firstPage : TimeEntryResponse = {
    time_entries: [{ id: 1 }],
    page: 1,
    next_page: 2,
    previous_page: null,
    total_pages: 2,
  };

  const secondPage : TimeEntryResponse = {
    time_entries: [{ id: 2 }],
    page: 2,
    next_page: null,
    previous_page: 1,
    total_pages: 2,
  };

  beforeEach(() => {
    httpClientMock = sandbox.createStubInstance(HttpClient);

    // in order to simulate rate-limiting, we'll have to use an option
    // here, e.g. withArgs(url, { observe: 'response', responseType: 'json' })

    httpClientMock.get.withArgs('/v2/time_entries').returns(of(firstPage));
    httpClientMock.get.withArgs('/v2/time_entries?page=2').returns(of(secondPage));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should make a request and combine pages', async () => {
    const apiService : ApiService = new ApiService(httpClientMock);
    const result = await apiService.getTimeEntries();
    expect(result).to.deep.equal([
      { id: 1 }, { id: 2 }
    ]);
  });

});
