import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../shared/models/ILoginCredentials.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../shared/models/ILoginResponse.interface';

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
      map(response => response),
      catchError((err: any) => {
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