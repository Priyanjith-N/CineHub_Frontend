import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IBookSeatSucessfullResponse, ICancelTicketSucessfullResponse, ICreateCheckOutSessionStripeSucessfullResponse, IGetAllActiveTicketsSucessfullResponse, IGetAllShowsForAMovieSucessfullResponse, IGetAllTransactionListSucessfullResponse, IGetDataForHomePageSucessfullResponse, IGetMovieDetailsSucessfullResponse, IGetTheaterScreenLayoutSucessfullResponse, IGetTicketDetailsSucessfullResponse, IGetUserProfileSucessfullResponse } from '../../shared/models/userAPIResponse.interface';

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

  getAllShowsForAMovie(movieId: string): Observable<IGetAllShowsForAMovieSucessfullResponse> {
    const url: string = `${this.api}/getAllShowsForAMovie/${movieId}`;

    const APIResponse$: Observable<IGetAllShowsForAMovieSucessfullResponse> = this.httpClient.get<IGetAllShowsForAMovieSucessfullResponse>(url)
    .pipe(
      map(res => res),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getTheaterScreenLayout(scheduleId: string): Observable<IGetTheaterScreenLayoutSucessfullResponse> {
    const url: string = `${this.api}/getTheaterScreenLayout/${scheduleId}`;

    const APIResponse$: Observable<IGetTheaterScreenLayoutSucessfullResponse> = this.httpClient.get<IGetTheaterScreenLayoutSucessfullResponse>(url)
    .pipe(
      map(res => res),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  createCheckOutSessionStripe(scheduleId: string, selectedSeats: { rowIdx: number; colIdx: number; }[]): Observable<ICreateCheckOutSessionStripeSucessfullResponse> {
    const url: string = `${this.api}/create-checkout-session`;

    const APIResponse$: Observable<ICreateCheckOutSessionStripeSucessfullResponse> = this.httpClient.post<ICreateCheckOutSessionStripeSucessfullResponse>(url, {
      scheduleId,
      selectedSeats
    })
    .pipe(
      map(res => res as ICreateCheckOutSessionStripeSucessfullResponse),
      catchError(err => throwError(err))
    );

    return APIResponse$;
  }

  bookSeat(checkoutSessionId: string): Observable<IBookSeatSucessfullResponse> {
    const url: string = `${this.api}/bookseat`;

    const APIResponse$: Observable<IBookSeatSucessfullResponse> = this.httpClient.post<IBookSeatSucessfullResponse>(url, {
      checkoutSessionId
    })
    .pipe(
      map(res => res as IBookSeatSucessfullResponse),
      catchError(err => throwError(err))
    );

    return APIResponse$;
  }

  getAllActiveTickets(): Observable<IGetAllActiveTicketsSucessfullResponse> {
    const url: string = `${this.api}/activetickets`;

    const APIResponse$: Observable<IGetAllActiveTicketsSucessfullResponse> = this.httpClient.get<IGetAllActiveTicketsSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetAllActiveTicketsSucessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  cancelTicket(ticketId: string): Observable<ICancelTicketSucessfullResponse> {
    const url: string = `${this.api}/cancelticket/${ticketId}`;

    const APIResponse$: Observable<ICancelTicketSucessfullResponse> = this.httpClient.patch<ICancelTicketSucessfullResponse>(url, {})
    .pipe(
      map(res => res as ICancelTicketSucessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getAllTransactionList(): Observable<IGetAllTransactionListSucessfullResponse> {
    const url: string = `${this.api}/transactionlist`;

    const APIResponse$: Observable<IGetAllTransactionListSucessfullResponse> = this.httpClient.get<IGetAllTransactionListSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetAllTransactionListSucessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getTicketDetails(ticketId: string): Observable<IGetTicketDetailsSucessfullResponse> {
    const url: string = `${this.api}/ticket/${ticketId}`;

    const APIResponse$: Observable<IGetTicketDetailsSucessfullResponse> = this.httpClient.get<IGetTicketDetailsSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetTicketDetailsSucessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }

  getUserProfileData(): Observable<IGetUserProfileSucessfullResponse> {
    const url: string = `${this.api}/getUserProfileData`;

    const APIResponse$: Observable<IGetUserProfileSucessfullResponse> = this.httpClient.get<IGetUserProfileSucessfullResponse>(url)
    .pipe(
      map(res => res as IGetUserProfileSucessfullResponse),
      catchError((err: any) => throwError(err))
    );

    return APIResponse$;
  }
}