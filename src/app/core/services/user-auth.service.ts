import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../shared/models/ILoginCredentials.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../shared/models/ILoginResponse.interface';
import { IOTPVerificationSuccessfullResponse } from '../../shared/models/IOTPVerificationResponse.interface';
import { IUserRegisterCredentials } from '../../shared/models/IRegisterCredentials.interface';
import { IRegisterSuccessfullResponse } from '../../shared/models/IRegisterResponse.interface';

interface hello {
  email: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private api: string = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) { }

  handelLoginRequest(loginCredentials: ILoginCredentials): Observable<ILoginSuccessfullResponse>{
    const url: string = `${this.api}/login`;

    const loginAPIResponse$: Observable<ILoginSuccessfullResponse> = this.httpClient.post<ILoginSuccessfullResponse>(url, loginCredentials)
    .pipe(
      map((response: ILoginSuccessfullResponse) => response as ILoginSuccessfullResponse),
      catchError((err: any) => { // even the error response is sent it the object send form backend will be in error property if not it is some other err
        if(err.error) {
          return throwError(err.error as ILoginErrorResponse);
        }else{
          return throwError(err);
        }
      })
    );

    return loginAPIResponse$;
  }

  handelRegisterationRequest(registerCredentials: IUserRegisterCredentials): Observable<IRegisterSuccessfullResponse> {
    const url: string = `${this.api}/register`;

    const registerAPIResponse$: Observable<IRegisterSuccessfullResponse> = this.httpClient.post<IRegisterSuccessfullResponse>(url, registerCredentials)
    .pipe(
      map((response: IRegisterSuccessfullResponse) => response as IRegisterSuccessfullResponse),
      catchError((err: any) => {
        if(err.error) { // even the error response is sent it the object send form backend will be in error property if not it is some other err
          return throwError(err.error as IOTPVerificationSuccessfullResponse);
        }else{
          return throwError(err);
        }
      })
    );

    return registerAPIResponse$;
  }

  handelOTPVerificationRequest(otp: string): Observable<IOTPVerificationSuccessfullResponse> {
    const url: string = `${this.api}/otpVerify`;

    const otpVerificationAPIResponse$: Observable<IOTPVerificationSuccessfullResponse> = this.httpClient.post<IOTPVerificationSuccessfullResponse>(url, otp)
    .pipe(
      map((response: IOTPVerificationSuccessfullResponse) => response),
      catchError((err: any) => {
        if(err.error) { // even the error response is sent it the object send form backend will be in error property if not it is some other err
          return throwError(err.error as IOTPVerificationSuccessfullResponse);
        }else{
          return throwError(err);
        }
      })
    );

    return otpVerificationAPIResponse$;
  }

}