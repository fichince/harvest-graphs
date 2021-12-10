import { ApiService } from './api.service';
import * as sinon from 'sinon';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should make a request and combine pages', async () => {

    const firstResponse = new HttpResponse<TimeEntryResponse>({ 
      body: firstPage 
    });
    const secondResponse = new HttpResponse<TimeEntryResponse>({
      body: secondPage
    });

    httpClientMock.get.onFirstCall().returns(of(firstResponse));
    httpClientMock.get.onSecondCall().returns(of(secondResponse));

    const apiService : ApiService = new ApiService(httpClientMock);
    const result = await apiService.getTimeEntries();
    expect(result).to.deep.equal([
      { id: 1 }, { id: 2 }
    ]);

    expect(httpClientMock.get).to.have.been.calledTwice;
    expect(httpClientMock.get.firstCall.firstArg).to.equal('/v2/time_entries');
    expect(httpClientMock.get.secondCall.firstArg).to.equal('/v2/time_entries?page=2');
  });

  it('should make request with parameters', async () => {
    // single page
    const response = new HttpResponse<TimeEntryResponse>({
      body: {
        time_entries: [{ id: 1 }],
        page: 1,
        next_page: null,
        previous_page: null,
        total_pages: 1,
      }
    });

    httpClientMock.get.onFirstCall().returns(of(response));
    const apiService : ApiService = new ApiService(httpClientMock);

    const result = await apiService.getTimeEntries('2021-10-01', '2021-10-08');
    expect(result).to.deep.equal([
      { id: 1 }
    ]);

    expect(httpClientMock.get).to.have.been.calledOnce;
    expect(httpClientMock.get.firstCall.firstArg)
      .to.equal('/v2/time_entries?from=2021-10-01&to=2021-10-08');

  });

  it('should make a request with parameters and combine pages', async () => {

    const firstResponse = new HttpResponse<TimeEntryResponse>({ 
      body: firstPage 
    });
    const secondResponse = new HttpResponse<TimeEntryResponse>({
      body: secondPage
    });

    httpClientMock.get.onFirstCall().returns(of(firstResponse));
    httpClientMock.get.onSecondCall().returns(of(secondResponse));

    const apiService : ApiService = new ApiService(httpClientMock);
    const result = await apiService.getTimeEntries('2021-10-01', '2021-10-08');
    expect(result).to.deep.equal([
      { id: 1 }, { id: 2 }
    ]);

    expect(httpClientMock.get).to.have.been.calledTwice;
    expect(httpClientMock.get.firstCall.firstArg)
      .to.equal('/v2/time_entries?from=2021-10-01&to=2021-10-08');
    expect(httpClientMock.get.secondCall.firstArg)
      .to.equal('/v2/time_entries?from=2021-10-01&page=2&to=2021-10-08');
  });

  // TODO
  describe.skip('Throtting', () => {
    it('should retry if it gets throttled', async () => {

      const firstResponse = new HttpResponse<TimeEntryResponse>({ 
        body: firstPage 
      });
      // rate-limiting response
      const secondResponse = new HttpResponse<TimeEntryResponse>({
        status: 429,
        headers: new HttpHeaders({ 'Retry-After': '5' })
      });
      const thirdResponse = new HttpResponse<TimeEntryResponse>({ 
        body: secondPage 
      });

      httpClientMock.get.onFirstCall().returns(of(firstResponse));
      httpClientMock.get.onSecondCall().returns(of(secondResponse));
      httpClientMock.get.onThirdCall().returns(of(thirdResponse));

      const apiService : ApiService = new ApiService(httpClientMock);
      const result = await apiService.getTimeEntries();
      expect(result).to.deep.equal([
        { id: 1 }, { id: 2 }
      ]);

      expect(httpClientMock.get).to.have.been.calledThrice;
      expect(httpClientMock.get.firstCall.firstArg)
        .to.equal('/v2/time_entries');

      // it tries twice
      expect(httpClientMock.get.secondCall.firstArg)
        .to.equal('/v2/time_entries?page=2');
      expect(httpClientMock.get.thirdCall.firstArg)
        .to.equal('/v2/time_entries?page=2');
      });
  });

});
