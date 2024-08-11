import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IAddTheaterErrorResponse, IAddTheaterSucessfullResponse, IGetDistributerListAPISucessfullResponse } from '../../shared/models/ITheaterOwnerAPIResponse.interface';
import { IGetMovieListOfDistributerDataAPISucessfullResponse } from '../../shared/models/theaterOwnerAPIResponse.interface';
import ITheaterCredentials from '../../shared/models/ITheaterCredentials.interface';

@Injectable({
  providedIn: 'root'
})
export class TheaterOwnerService {
  private httpClient: HttpClient = inject(HttpClient);

  private api: string = `${environment.BACKEND_DOMAIN}/theaterOwner`;

  constructor() { }

  getDistributersList(): Observable<IGetDistributerListAPISucessfullResponse> {
    const url: string = `${this.api}/getdistributerlist`;

    const getDistributersListAPIResponse$: Observable<IGetDistributerListAPISucessfullResponse> = this.httpClient.get<IGetDistributerListAPISucessfullResponse>(url)
    .pipe(
      map(res => res as IGetDistributerListAPISucessfullResponse),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getDistributersListAPIResponse$;
  }

  getMovieListOfDistributerData(distributerId: string): Observable<IGetMovieListOfDistributerDataAPISucessfullResponse> {
    const url: string = `${this.api}/getmovielist/${distributerId}`;

    const getMovieListOfDistributerDataAPIResponse$: Observable<IGetMovieListOfDistributerDataAPISucessfullResponse> = this.httpClient.get<IGetMovieListOfDistributerDataAPISucessfullResponse>(url)
    .pipe(
      map(res => res as IGetMovieListOfDistributerDataAPISucessfullResponse),
      catchError((err: any) => {
        return throwError(err);
      })
    ); 

    return getMovieListOfDistributerDataAPIResponse$;
  }

  addTheater(data: ITheaterCredentials): Observable<IAddTheaterSucessfullResponse> {
    const url: string = `${this.api}/addtheater`;

    const addTheaterAPIResponse$: Observable<IAddTheaterSucessfullResponse> = this.httpClient.post<IAddTheaterSucessfullResponse>(url, data)
    .pipe(
      map(res => res as IAddTheaterSucessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IAddTheaterErrorResponse)
        }else{
          return throwError(err);
        }
      })
    );

    return addTheaterAPIResponse$;
  }
}
