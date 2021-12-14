import { TimeEntry } from "./time-entry";

export interface PaginatedResponse {
  page: number,
  total_pages: number,
  next_page: number | null,
  previous_page: number | null,
}

export interface TimeEntryResponse extends PaginatedResponse {
  time_entries: TimeEntry[]
}
