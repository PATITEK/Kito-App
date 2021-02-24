import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { APICONFIG } from '../@http-config';
import { IPageRequest } from '../global';

@Injectable({
  providedIn: 'root'
})
export class VaticanService {

  constructor(private http: HttpClient) { }
  public getAll(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.VATICAN.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
}
