import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../shared/models/ILoginCredentials.interface';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../shared/models/ILoginResponse.interface';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private api: string = 'http://localhost:8080/api/admin';

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
}
