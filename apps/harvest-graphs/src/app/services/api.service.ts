import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, lastValueFrom, map, reduce } from 'rxjs';
import { TimeEntryResponse } from '../models/paginated-response';

import { TimeEntry } from '../models/time-entry';
import { Duration } from './graph-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // TODO:
  // - handle input parameters
  // - handle throttling (have to use get(url, { observe: 'response', responseType: 'json' }))

  getTimeEntries(start? : string, duration? : Duration) : Promise<TimeEntry[]> {
    const url = '/v2/time_entries';

    const results = this.http.get<TimeEntryResponse>(url).pipe(
      expand((response) => {
        if (response.next_page) {
          return this.http.get<TimeEntryResponse>(`${url}?page=${response.next_page}`);
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
