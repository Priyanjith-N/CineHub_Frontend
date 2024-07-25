import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../shared/models/ILoginCredentials.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../shared/models/ILoginResponse.interface';
import { IDistributerRegisterCredentials } from '../../shared/models/IRegisterCredentials.interface';
import { IRegisterSuccessfullResponse } from '../../shared/models/IRegisterResponse.interface';
import { IOTPResendErrorResponse, IOTPResendSuccessfullResponse, IOTPVerificationErrorResponse, IOTPVerificationSuccessfullResponse } from '../../shared/models/IOTPVerificationResponse.interface';

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
  
  handelRegisterationRequest(registerData: IDistributerRegisterCredentials): Observable<IRegisterSuccessfullResponse> {
    const url: string = `${this.api}/register`;

    const registerAPIResponse$: Observable<IRegisterSuccessfullResponse> = this.httpClient.post<IRegisterSuccessfullResponse>(url, registerData)
    .pipe(
      map((response => response as IRegisterSuccessfullResponse)),
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
            return throwError(err.error as IOTPVerificationErrorResponse);
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

  handelOTPRsendRequest(): Observable<IOTPResendSuccessfullResponse> {
    const url: string = `${this.api}/otpResend`;

    const otpResendAPIResponse$: Observable<IOTPResendSuccessfullResponse> = this.httpClient.post<IOTPResendSuccessfullResponse>(url, {})
    .pipe(
      map((response => response as IOTPResendSuccessfullResponse)),
      catchError((err: any) => {
        if(err?.error) {
          return throwError(err.error as IOTPResendErrorResponse);
        }else{
          return throwError(err);
        }
      })
    );

    return otpResendAPIResponse$;
  }
}
