import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TimeEntry } from '../models/time-entry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTimeEntries() : Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>('/v2/time_entries');
  };
}
