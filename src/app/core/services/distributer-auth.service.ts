import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../shared/models/ILoginCredentials.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../shared/models/ILoginResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class DistributerAuthService {
  private api: string = 'http://localhost:8080/api/distributer';

  constructor(private httpClient: HttpClient) { }

  handleLoginRequest(loginCredentials: ILoginCredentials): Observable<ILoginSuccessfullResponse> {
    const url: string = `${this.api}/login`;

    const loginAPIResponse$: Observable<ILoginSuccessfullResponse> = this.httpClient.post<ILoginSuccessfullResponse>(url, loginCredentials)
    .pipe(
      map((response) => response as ILoginSuccessfullResponse),
      catchError((err: any) => { 
        if(err.error) {
          const errObj: ILoginErrorResponse = err.error as ILoginErrorResponse;

          const errorField: string | undefined = errObj.errorField;

          if((errorField !== 'otp') && (errorField !== 'document') && (errorField !== 'Required')) {
            return throwError(err.error as ILoginErrorResponse);
          }else if(errorField === 'otp') {
            err['notOTPVerified'] = true;
          }else if(errorField === 'document') {
            err['notDocumentVerified'] = true;
          }else {
            err['requiredErr'] = errObj.message;
          }

          return throwError(err);
        }else{
          return throwError(err);
        }
      })
    );

    return loginAPIResponse$;
  }
}
