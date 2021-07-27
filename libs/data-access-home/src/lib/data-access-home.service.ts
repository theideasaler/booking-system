import { Injectable } from '@angular/core';
import { SearchTypes, TicketmasterResultModel } from '@booking-system/models';
import { logSuccess } from '@booking-system/utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataAccessHomeService {
  constructor(private http: HttpClient) {}

  getData(
    type: SearchTypes,
    pageIndex: number,
    pageSize: number
  ): Observable<TicketmasterResultModel> {
    return this.http
      .get<TicketmasterResultModel>(
        `https://app.ticketmaster.com/discovery/v2/${type}.json?size=${pageSize}&page=${pageIndex}&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`
      )
      .pipe(
        map((r) => {
          logSuccess('getData', r);
          return r;
        }),
        catchError((err) => {
          console.error('getData', err);
          return throwError(err);
        })
      );
  }
}
