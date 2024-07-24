import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../shared/models/ILoginCredentials.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../shared/models/ILoginResponse.interface';
import { ITheaterOwnerRegisterCredentials } from '../../shared/models/IRegisterCredentials.interface';
import { IRegisterSuccessfullResponse } from '../../shared/models/IRegisterResponse.interface';
import { IOTPResendErrorResponse, IOTPVerificationErrorResponse, IOTPVerificationSuccessfullResponse } from '../../shared/models/IOTPVerificationResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TheaterOwnerAuthService {
  private api: string = 'http://localhost:8080/api/theaterOwner';

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
            err['requiredErrMessage'] = errObj.message;
          }

          return throwError(err);
        }else{
          return throwError(err);
        }
      })
    );

    return loginAPIResponse$;
  }

  handelRegisterationRequest(registerCredentials: ITheaterOwnerRegisterCredentials): Observable<IRegisterSuccessfullResponse> {
    const url: string = `${this.api}/register`;

    const registerAPIResponse$: Observable<IRegisterSuccessfullResponse> = this.httpClient.post<IRegisterSuccessfullResponse>(url, registerCredentials)
    .pipe(
      map((response) => response as IRegisterSuccessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          const errObj: ILoginErrorResponse = err.error as ILoginErrorResponse;

          const errorField: string | undefined = errObj.errorField;

          if(errorField !== 'Required') {
            return throwError(err.error as ILoginErrorResponse);
          }
          
          err['requiredErrMessage'] = errObj.message;

          return throwError(err);
        }else{
          return throwError(err);
        }
      })
    );

    return registerAPIResponse$;
  }

  handelOTPVerificationRequest(otp: string): Observable<IOTPVerificationSuccessfullResponse> {
    const url: string = `${this.api}/otpVerify`;

    const otpVerificationAPIResponse$: Observable<IOTPVerificationSuccessfullResponse> = this.httpClient.post<IOTPVerificationSuccessfullResponse>(url, {
      otp
    })
    .pipe(
      map((response) => response as IOTPVerificationSuccessfullResponse),
      catchError((err: any) => {
        if(err.error) {
          const errObj: IOTPVerificationErrorResponse = err.error as IOTPVerificationErrorResponse;

          const errorField: string | undefined = errObj.errorField;

          if(errorField !== 'Required') {
            return throwError(err.error as IOTPResendErrorResponse);
          }
          
          err['requiredErrMessage'] = errObj.message;

          return throwError(err);
        }else{
          return throwError(err)
        }
      })
    );

    return otpVerificationAPIResponse$;
  }
}
