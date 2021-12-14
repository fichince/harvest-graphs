export interface TimeEntry {
  id : number,
  spent_date : string,
  hours : number,
  billable : boolean,
  user? : {
    id : number,
    name : string,
  },
  client : {
    id : number,
    name: string,
  },
  project : {
    id : number,
    name: string,
  },
  task : {
    id : number,
    name: string,
  },
}