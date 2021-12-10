import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, lastValueFrom, map, Observable, reduce } from 'rxjs';
import { TimeEntryResponse } from '../models/paginated-response';
import * as qs from 'query-string';

import { TimeEntry } from '../models/time-entry';
import { Duration } from './graph-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private doGet<T>(url : string, params? : any) : Observable<T> {
    const reqUrl = qs.stringifyUrl({
      url,
      query: params,
    }, {
      skipNull: true
    });

    return this.http.get<T>(reqUrl, { observe: 'response', responseType: 'json' }).pipe(
      map((response) => response.body || {} as T)
    );
  }

  // TODO:
  // - handle throttling (have to use get(url, { observe: 'response', responseType: 'json' }))

  getTimeEntries(from? : string, to? : string) : Promise<TimeEntry[]> {
    const url = '/v2/time_entries';
    const params = { from, to };

    const results = this.doGet<TimeEntryResponse>(url, params).pipe(
      expand((response) => {
        if (response.next_page) {
          return this.doGet<TimeEntryResponse>(url, { ...params, page: response.next_page });
        } else {
          return EMPTY;
        }
      }),
      map((response) => response.time_entries),
      reduce((acc, time_entries) => acc.concat(time_entries), new Array<TimeEntry>())
    );

    return lastValueFrom(results);
  };
}
