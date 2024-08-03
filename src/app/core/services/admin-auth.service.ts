import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../shared/models/ILoginCredentials.interface';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../shared/models/ILoginResponse.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ILogoutErrorResponse, ILogoutSuccessfullResponse } from '../../shared/models/ILogoutResponse.interface';
import { IVerifyAuthTokenErrorResponse, IVerifyAuthTokenSuccessfullResponse } from '../../shared/models/IVerifyAuthTokenResponse.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private api: string = `${environment.BACKEND_DOMAIN}/api/admin`;

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

  handelVerifyAuthTokenRequest(): Promise<IVerifyAuthTokenSuccessfullResponse | undefined> {
    const url: string = `${this.api}/verifyToken`;

    const verifyAuthTokenAPIResponse$: Observable<IVerifyAuthTokenSuccessfullResponse> = this.httpClient.get<IVerifyAuthTokenSuccessfullResponse>(url)
    .pipe(
      map((response: IVerifyAuthTokenSuccessfullResponse) => response),
      catchError((err: any) => {
        if(err.error){
          return throwError(err as IVerifyAuthTokenErrorResponse);
        }else{
          return throwError(err);
        }
      })
    );

    return verifyAuthTokenAPIResponse$.toPromise();
  }

  handelLogoutRequest(): Observable<ILogoutSuccessfullResponse> {
    const url: string = `${this.api}/logout`;

    const LogoutAPIResponse$: Observable<ILogoutSuccessfullResponse> = this.httpClient.post<ILogoutSuccessfullResponse>(url, {})
    .pipe(
      map((response: ILogoutSuccessfullResponse) => response),
      catchError((err: any) => {
        if(err.error) { // even the error response is sent it the object send form backend will be in error property if not it is some other err
          return throwError(err.error as ILogoutErrorResponse);
        }else{
          return throwError(err);
        }
      })
    );

    return LogoutAPIResponse$;
  }
}
