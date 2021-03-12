import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { APICONFIG } from '..';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(
    private http: HttpClient
  ) { }

  public getByMonth(cal_date) {
    return this.http.get<any>(`${APICONFIG.CALENDARS.GET_BY_MONTH}?cal_date=${cal_date}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getByWeek(cal_date) {
    return this.http.get<any>(`${APICONFIG.CALENDARS.GET_BY_WEEK}?cal_date=${cal_date}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getByDay(cal_date) {
    return this.http.get<any>(`${APICONFIG.CALENDARS.GET_BY_DAY}?cal_date=${cal_date}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
}
