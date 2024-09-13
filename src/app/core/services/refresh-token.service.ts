import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private httpClient: HttpClient = inject(HttpClient);

  private api: string = `${environment.BACKEND_DOMAIN}/refresh-token`;

  refreshToken(): Observable<{ message: string; token: string; }> {
    return this.httpClient.post<{ message: string; token: string; }>(this.api, {})
    .pipe(
      map(res => {
        localStorage.setItem('token', res.token);
        return res;
      })
    );
  }
}
