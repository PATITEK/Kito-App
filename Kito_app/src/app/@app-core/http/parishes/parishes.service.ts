import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from 'src/app/@app-core/utils';
import { APICONFIG } from '../@http-config/api';
import { IPageParishes } from './parishes.DTO';

@Injectable({
  providedIn: 'root'
})
export class ParishesService {

  constructor(private http: HttpClient) { }
  public getAll(request: IPageParishes) {
    return this.http.get<any>(`${APICONFIG.PARISHES.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
}
