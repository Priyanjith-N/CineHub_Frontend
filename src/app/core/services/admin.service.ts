import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IDistributerData, IRetriveDataSucessfullAPIResponse, ITheaterOwnerData, IUserData } from '../../shared/models/adminAPIResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api: string = 'http://localhost:8080/admin';

  constructor(private httpClient: HttpClient) { }

  getAllUsers() : Observable<IRetriveDataSucessfullAPIResponse<IUserData>> {
    const url: string = `${this.api}/users`;

    const getUserAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<IUserData>> = this.httpClient.get<IRetriveDataSucessfullAPIResponse<IUserData>>(url).pipe(
      map((response) => response as IRetriveDataSucessfullAPIResponse<IUserData>),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getUserAPIResponse$;
  }

  getAllTheatherOwners() : Observable<IRetriveDataSucessfullAPIResponse<ITheaterOwnerData>> {
    const url: string = `${this.api}/theaterOwners`;

    const getTheaterOwnerAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<ITheaterOwnerData>> = this.httpClient.get<IRetriveDataSucessfullAPIResponse<ITheaterOwnerData>>(url).pipe(
      map((response) => response as IRetriveDataSucessfullAPIResponse<ITheaterOwnerData>),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getTheaterOwnerAPIResponse$;
  }

  getAllDistributers() : Observable<IRetriveDataSucessfullAPIResponse<IDistributerData>> {
    const url: string = `${this.api}/distributers`;

    const getDistributerAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<IDistributerData>> = this.httpClient.get<IRetriveDataSucessfullAPIResponse<IDistributerData>>(url).pipe(
      map((response) => response as IRetriveDataSucessfullAPIResponse<IDistributerData>),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getDistributerAPIResponse$;
  }
}
