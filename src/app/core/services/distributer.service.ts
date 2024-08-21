import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IDistributeMovieErrorResponse, IDistributeMovieSuccessfullResponse, IEditProfitSharingErrorResponse, IEditProfitSharingSuccessfullResponse, IGetAllAvaliableMovieDataSuccessfullResponse, IMyDistributedMoviesErrorResponse, IMyDistributedMoviesSuccessfullResponse } from '../../shared/models/IMovieAPIResponse.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IDistributeMovieData } from '../../shared/models/IMovieCredentials.interface';
import { IApproveMovieRequestSucessfullResponse, IGetAllMovieRequestsSucessfullResponse, IRejectMovieRequestSucessfullResponse } from '../../shared/models/distributerAPIResponse.interface';

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

  editProfitSharing(distributeData: IDistributeMovieData): Observable<IEditProfitSharingSuccessfullResponse> {
    const url: string = `${this.api}/editprofitsharingofdistributedmovie/${distributeData.movieId}`;

    const editProfitSharingAPIResponse$: Observable<IEditProfitSharingSuccessfullResponse> = this.httpClient.patch<IEditProfitSharingSuccessfullResponse>(url, {
      releaseDate: distributeData.releaseDate,
      profitSharingPerTicket: distributeData.profitSharingPerTicket
    })
    .pipe(
      map(res => res as IEditProfitSharingSuccessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IEditProfitSharingErrorResponse);
        }
        return throwError(err);
      })
    );

    return editProfitSharingAPIResponse$;
  }

  getAllMovieRequest(): Observable<IGetAllMovieRequestsSucessfullResponse> {
    const url: string = `${this.api}/getallmovierequests`;

    const APIResponse$: Observable<IGetAllMovieRequestsSucessfullResponse> = this.httpClient.get<IGetAllMovieRequestsSucessfullResponse>(url)
    .pipe(
      map(res => res),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return APIResponse$;
  }

  approveMovieRequest(requestId: string, theaterOwnerEmail: string, movieName: string): Observable<IApproveMovieRequestSucessfullResponse> {
    const url: string = `${this.api}/approvemovierequest/${requestId}`;

    const APIResponse$: Observable<IApproveMovieRequestSucessfullResponse> = this.httpClient.patch<IApproveMovieRequestSucessfullResponse>(url, {
      theaterOwnerEmail,
      movieName
    })
    .pipe(
      map(res => res),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  rejectMovieRequest(requestId: string, theaterOwnerEmail: string, movieName: string, reason: string): Observable<IRejectMovieRequestSucessfullResponse> {
    const url: string = `${this.api}/rejectmovierequest/${requestId}`;

    const APIResponse$: Observable<IRejectMovieRequestSucessfullResponse> = this.httpClient.patch<IRejectMovieRequestSucessfullResponse>(url, {
      theaterOwnerEmail,
      movieName,
      reason
    })
    .pipe(
      map(res => res),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }
}
