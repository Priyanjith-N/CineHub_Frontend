import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IBlockOrUnblockAPIErrorResponse, IBlockOrUnblockAPISucessfullResponse, IDistributerData, INotVerifiedDistributers, INotVerifiedTheaterOwners, IRetriveDataSucessfullAPIResponse, ISingleDataRetrivalAPIResponse, ITheaterOwnerData, IUserData } from '../../shared/models/adminAPIResponse.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api: string = `${environment.BACKEND_DOMAIN}/admin`;

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

  getTheaterOwner(id: string): Observable<ISingleDataRetrivalAPIResponse<ITheaterOwnerData>> {
    const url: string = `${this.api}/theaterOwner/${id}`;

    const getDataAPIResponse$: Observable<ISingleDataRetrivalAPIResponse<ITheaterOwnerData>> = this.httpClient.get<ISingleDataRetrivalAPIResponse<ITheaterOwnerData>>(url)
    .pipe(
      map((response) => response as ISingleDataRetrivalAPIResponse<ITheaterOwnerData>),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getDataAPIResponse$;
  }

  getDistributer(id: string): Observable<ISingleDataRetrivalAPIResponse<IDistributerData>> {
    const url: string = `${this.api}/distributers/${id}`;

    const getDataAPIResponse$: Observable<ISingleDataRetrivalAPIResponse<IDistributerData>> = this.httpClient.get<ISingleDataRetrivalAPIResponse<IDistributerData>>(url)
    .pipe(
      map((response) => response as ISingleDataRetrivalAPIResponse<IDistributerData>),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return getDataAPIResponse$;
  }

  theaterOwnerVerifyDocument(id: string, status: string, message: string | undefined): Observable<{ message: string }> {
    const url: string = `${this.api}/theaterOwnerVerifyDocument/${id}`;

    const theaterOwnerVerifyDocumentAPIResponse$: Observable<{ message: string }> = this.httpClient.patch<{ message: string }>(url, {
      status,
      message
    })
    .pipe(
      map((response) => response as { message: string }),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return theaterOwnerVerifyDocumentAPIResponse$;
  }

  distributerVerifyDocument(id: string, status: string, message: string | undefined): Observable<{ message: string }> {
    const url: string = `${this.api}/distributersVerifyDocument/${id}`;

    const distributerVerifyDocumentAPIResponse$: Observable<{ message: string }> = this.httpClient.patch<{ message: string }>(url, {
      status,
      message
    })
    .pipe(
      map((response) => response as { message: string }),
      catchError((err: any) => {
        return throwError(err);
      })
    );

    return distributerVerifyDocumentAPIResponse$;
  }
}
