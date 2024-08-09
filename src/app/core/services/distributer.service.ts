import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IDistributeMovieErrorResponse, IDistributeMovieSuccessfullResponse, IGetAllAvaliableMovieDataSuccessfullResponse, IMyDistributedMoviesErrorResponse, IMyDistributedMoviesSuccessfullResponse } from '../../shared/models/IMovieAPIResponse.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IDistributeMovieData } from '../../shared/models/IMovieCredentials.interface';

@Injectable({
  providedIn: 'root'
})
export class DistributerService {
  private api: string = `${environment.BACKEND_DOMAIN}/distributer`;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getAllAvailableMovies(): Observable<IGetAllAvaliableMovieDataSuccessfullResponse> {
    const url: string = `${this.api}/getallavailablemovies`;

    const getMovieDataAPIResponse$: Observable<IGetAllAvaliableMovieDataSuccessfullResponse> = this.httpClient.get<IGetAllAvaliableMovieDataSuccessfullResponse>(url)
    .pipe(
      map(res => res as IGetAllAvaliableMovieDataSuccessfullResponse),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getMovieDataAPIResponse$;
  }

  distributeMovie(distributeData: IDistributeMovieData): Observable<IDistributeMovieSuccessfullResponse> {
    const url: string = `${this.api}/distributemovie/${distributeData.movieId}`;

    const distributeMovieAPIResponse$: Observable<IDistributeMovieSuccessfullResponse> = this.httpClient.patch<IDistributeMovieSuccessfullResponse>(url, {
      releaseDate: distributeData.releaseDate,
      profitSharingPerTicket: distributeData.profitSharingPerTicket
    })
    .pipe(
      map(res => res as IDistributeMovieSuccessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IDistributeMovieErrorResponse);
        }
        return throwError(err);
      })
    );

    return distributeMovieAPIResponse$;
  }

  getAllDistributedMovies(): Observable<IMyDistributedMoviesSuccessfullResponse> {
    const url: string = `${this.api}/getmymovies`;

    const getAllDistributedMoviesAPIResponse$: Observable<IMyDistributedMoviesSuccessfullResponse> = this.httpClient.get<IMyDistributedMoviesSuccessfullResponse>(url)
    .pipe(
      map(res => res as IMyDistributedMoviesSuccessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IMyDistributedMoviesErrorResponse);
        }
        return throwError(err);
      })
    );

    return getAllDistributedMoviesAPIResponse$;
  }
}
