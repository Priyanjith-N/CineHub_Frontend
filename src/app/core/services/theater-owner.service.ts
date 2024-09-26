import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IAddTheaterErrorResponse, IAddTheaterSucessfullResponse, IGetDistributerListAPISucessfullResponse, IGetAllTheatersSucessfullResponse, IAddScreenSucessfullResponse, IAddScreenErrorResponse, IGetAllScreensSucessfullResponse, IGetTheaterSucessfullResponse, IRequestMovieSucessfullResponse, IRequestMovieErrorResponse, IReRequestMovieSucessfullResponse } from '../../shared/models/ITheaterOwnerAPIResponse.interface';
import { IAddMovieSchedule, IGetAllMovieRequestsSucessfullResponse, IGetallmoviescheduleSucessfullResponse, IGetAllMoviesFromCollectionSucessfullResponse, IGetMovieListOfDistributerDataAPISucessfullResponse, IGetScheduleOn, IGetTheaterOwnerDashboardDataSuccessfullResponse, IGetTheaterOwnerGraphDataSuccessfullResponse } from '../../shared/models/theaterOwnerAPIResponse.interface';
import ITheaterCredentials, { IScreenCredentials } from '../../shared/models/ITheaterCredentials.interface';
import IMovieRequestCredentials, { IMovieReRequestCredentials } from '../../shared/models/requestMovie.entity';
import { IScheduleCredentials } from '../../shared/models/schedule.entity';

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

  getAllTheaters(): Observable<IGetAllTheatersSucessfullResponse> {
    const url: string = `${this.api}/theater`;

    const getTheatersAPIResponse$: Observable<IGetAllTheatersSucessfullResponse> = this.httpClient.get<IGetAllTheatersSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetAllTheatersSucessfullResponse),
      catchError((err: any) => {
        return throwError(err);
      })
    ); 

    return getTheatersAPIResponse$;
  }

  addScreen(data: IScreenCredentials, theaterId: string): Observable<IAddScreenSucessfullResponse> {
    const url: string = `${this.api}/addScreen/${theaterId}`;

    const APIResponse$: Observable<IAddScreenSucessfullResponse> = this.httpClient.post<IAddScreenSucessfullResponse>(url, data)
    .pipe(
      map(res => res as IAddScreenSucessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IAddScreenErrorResponse);
        }else{
          return throwError(err);
        }
      })
    );

    return APIResponse$;
  }

  getAllScreens(theaterId: string): Observable<IGetAllScreensSucessfullResponse> {
    const url: string = `${this.api}/screens/${theaterId}`;

    const getScreensAPIResponse$: Observable<IGetAllScreensSucessfullResponse> = this.httpClient.get<IGetAllScreensSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetAllScreensSucessfullResponse),
      catchError((err: any) => {
        return throwError(err);
      })
    ); 

    return getScreensAPIResponse$;
  }

  getTheater(theaterId: string): Observable<IGetTheaterSucessfullResponse> {
    const url: string = `${this.api}/theater/${theaterId}`;

    const getTheaterAPIResponse$: Observable<IGetTheaterSucessfullResponse> = this.httpClient.get<IGetTheaterSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetTheaterSucessfullResponse),
      catchError((err: any) => {
        return throwError(err);
      })
    ); 

    return getTheaterAPIResponse$;
  }

  requestForMovie(data: IMovieRequestCredentials): Observable<IRequestMovieSucessfullResponse> {
    const url: string = `${this.api}/requestmovie`;

    const requestMovieAPIResponse$: Observable<IRequestMovieSucessfullResponse> = this.httpClient.post<IRequestMovieSucessfullResponse>(url, data)
    .pipe(
      map(res => res as IRequestMovieSucessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IRequestMovieErrorResponse);
        }

        return throwError(err);
      })
    );

    return requestMovieAPIResponse$;
  }

  reRequestForMovie(data: IMovieReRequestCredentials, movieRequestId: string): Observable<IReRequestMovieSucessfullResponse> {
    const url: string = `${this.api}/rerequestformovie/${movieRequestId}`;

    const reRequestMovieAPIResponse$: Observable<IReRequestMovieSucessfullResponse> = this.httpClient.patch<IReRequestMovieSucessfullResponse>(url, data)
    .pipe(
      map(res => res as IReRequestMovieSucessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return reRequestMovieAPIResponse$;
  }

  getAllMovieRequests(): Observable<IGetAllMovieRequestsSucessfullResponse> {
    const url: string = `${this.api}/getallmovierequest`;

    const APIResponse$: Observable<IGetAllMovieRequestsSucessfullResponse> = this.httpClient.get<IGetAllMovieRequestsSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetAllMovieRequestsSucessfullResponse),
      catchError(err => {
        return throwError(err);
      })
    );

    return APIResponse$;
  }

  getallmoviesfromcollection(): Observable<IGetAllMoviesFromCollectionSucessfullResponse> {
    const url: string = `${this.api}/getallmoviesfromcollection`;

    const APIResponse$: Observable<IGetAllMoviesFromCollectionSucessfullResponse> = this.httpClient.get<IGetAllMoviesFromCollectionSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetAllMoviesFromCollectionSucessfullResponse),
      catchError(err => {
        return throwError(err);
      })
    );

    return APIResponse$;
  }

  addMovieSchedule(data: IScheduleCredentials): Observable<IAddMovieSchedule> {
    const url: string = `${this.api}/addMovieSchedule`;

    const APIResponse$: Observable<IAddMovieSchedule> = this.httpClient.post<IAddMovieSchedule>(url, data)
    .pipe(
      map(res => res as IAddMovieSchedule),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getAllScheduleOnDate(date: Date, screenId: string): Observable<IGetScheduleOn> {
    const url: string = `${this.api}/getAllSchedulesOn?date=${date}&screenId=${screenId}`;

    const APIResponse$: Observable<IGetScheduleOn> = this.httpClient.get<IGetScheduleOn>(url)
    .pipe(
      map(res => res as IGetScheduleOn),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getAllMovieSchedule(screenId: string, theaterId: string): Observable<IGetallmoviescheduleSucessfullResponse> {
    const url: string = `${this.api}/getallmovieschedule/${screenId}/${theaterId}`;

    const APIResponse$: Observable<IGetallmoviescheduleSucessfullResponse> = this.httpClient.get<IGetallmoviescheduleSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetallmoviescheduleSucessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getDashboardData(): Observable<IGetTheaterOwnerDashboardDataSuccessfullResponse> {
    const url: string = `${this.api}/getdashboarddata`;

    const APIResponse$: Observable<IGetTheaterOwnerDashboardDataSuccessfullResponse> = this.httpClient.get<IGetTheaterOwnerDashboardDataSuccessfullResponse>(url)
    .pipe(
      map((response) => response as IGetTheaterOwnerDashboardDataSuccessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getGraphData(filter: string, theaterId: string, screenId: string): Observable<IGetTheaterOwnerGraphDataSuccessfullResponse> {
    const url: string = `${this.api}/getgraphdata/${theaterId}/${screenId}?filter=${filter}`;

    const APIResponse$: Observable<IGetTheaterOwnerGraphDataSuccessfullResponse> = this.httpClient.get<IGetTheaterOwnerGraphDataSuccessfullResponse>(url)
    .pipe(
      map((response) => response as IGetTheaterOwnerGraphDataSuccessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }
}
