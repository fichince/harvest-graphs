import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TimeEntry } from '../models/time-entry';
import { Duration } from './graph-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTimeEntries(start? : string, duration? : Duration) : Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>('/v2/time_entries');
  };
}
