import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IGetDataForHomePageSucessfullResponse, IGetMovieDetailsSucessfullResponse } from '../../shared/models/userAPIResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);

  private api: string = `${environment.BACKEND_DOMAIN}/user`;

  constructor() { }

  getDataForHomePage(): Observable<IGetDataForHomePageSucessfullResponse> {
    const url: string = `${this.api}/getdataforhome`;

    const APIResponse$: Observable<IGetDataForHomePageSucessfullResponse> = this.httpClient.get<IGetDataForHomePageSucessfullResponse>(url)
    .pipe(
      map(res => res),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getMovieDetails(movieId: string): Observable<IGetMovieDetailsSucessfullResponse> {
    const url: string = `${this.api}/getmoviedetails/${movieId}`;

    const APIResponse$: Observable<IGetMovieDetailsSucessfullResponse> = this.httpClient.get<IGetMovieDetailsSucessfullResponse>(url)
    .pipe(
      map(res => res),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }
}
