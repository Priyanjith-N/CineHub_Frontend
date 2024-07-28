import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IBlockOrUnblockAPIErrorResponse, IBlockOrUnblockAPISucessfullResponse, IDistributerData, INotVerifiedDistributers, INotVerifiedTheaterOwners, IRetriveDataSucessfullAPIResponse, ITheaterOwnerData, IUserData } from '../../shared/models/adminAPIResponse.interface';

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

  blockOrUnblockUser(data: {_id: string, isBlocked: boolean, name: string}): Observable<IBlockOrUnblockAPISucessfullResponse> {
    const url: string = `${this.api}/users/${data._id}`;

    const blockOrUnblockAPIResponse$: Observable<IBlockOrUnblockAPISucessfullResponse> = this.httpClient.patch<IBlockOrUnblockAPISucessfullResponse>(url, {
      isBlocked: data.isBlocked
    })
    .pipe(
      map((response) => response as IBlockOrUnblockAPISucessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IBlockOrUnblockAPIErrorResponse)
        }else{
          return throwError(err);
        }
      })
    );

    return blockOrUnblockAPIResponse$;
  }

  blockOrUnblockTheaterOwner(data: {_id: string, isBlocked: boolean, name: string}): Observable<IBlockOrUnblockAPISucessfullResponse> {
    const url: string = `${this.api}/theaterOwners/${data._id}`;

    const blockOrUnblockAPIResponse$: Observable<IBlockOrUnblockAPISucessfullResponse> = this.httpClient.patch<IBlockOrUnblockAPISucessfullResponse>(url, {
      isBlocked: data.isBlocked
    })
    .pipe(
      map((response) => response as IBlockOrUnblockAPISucessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IBlockOrUnblockAPIErrorResponse)
        }else{
          return throwError(err);
        }
      })
    );

    return blockOrUnblockAPIResponse$;
  }

  blockOrUnblockDistributer(data: {_id: string, isBlocked: boolean, name: string}): Observable<IBlockOrUnblockAPISucessfullResponse> {
    const url: string = `${this.api}/distributers/${data._id}`;

    const blockOrUnblockAPIResponse$: Observable<IBlockOrUnblockAPISucessfullResponse> = this.httpClient.patch<IBlockOrUnblockAPISucessfullResponse>(url, {
      isBlocked: data.isBlocked
    })
    .pipe(
      map((response) => response as IBlockOrUnblockAPISucessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          return throwError(err.error as IBlockOrUnblockAPIErrorResponse)
        }else{
          return throwError(err);
        }
      })
    );

    return blockOrUnblockAPIResponse$;
  }

  getAllVerificationDocument(): Observable<IRetriveDataSucessfullAPIResponse<(INotVerifiedDistributers | INotVerifiedTheaterOwners)>> {
    const url: string = `${this.api}/getAllDoumentVerificationRequests`;

    const getAllVerificationDocumentAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<(INotVerifiedDistributers | INotVerifiedTheaterOwners)>> = this.httpClient.get<IRetriveDataSucessfullAPIResponse<(INotVerifiedDistributers | INotVerifiedTheaterOwners)>>(url).pipe(
      map((response) => response as IRetriveDataSucessfullAPIResponse<(INotVerifiedDistributers | INotVerifiedTheaterOwners)>),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getAllVerificationDocumentAPIResponse$;
  }
}
