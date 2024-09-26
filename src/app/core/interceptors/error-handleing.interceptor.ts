import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, map, switchMap, throwError } from 'rxjs';
import IAllPossiableErrorResponse from '../../shared/models/errorHandleingInterceptorAllErrors.interface';
import IToastOption from '../../shared/models/IToastOption.interface';
import { ToastMessageService } from '../services/toast-message.service';
import { inject } from '@angular/core';
import { RefreshTokenService } from '../services/refresh-token.service';
import { ErrorMessage } from '../enums/errorMessage.enum';
import { errorField } from '../constants/error.constants';

export const errorHandleingInterceptor: HttpInterceptorFn = (req, next) => {
  const refreshTokenService: RefreshTokenService = inject(RefreshTokenService);

  const toastMessageService: ToastMessageService = inject(ToastMessageService);
  
  return next(req).pipe(
    catchError((err: any) => {
      if(!err.error) {
        return throwError(err);
      }

      const errObj: IAllPossiableErrorResponse = err.error as IAllPossiableErrorResponse;

      if(errObj.errorField === errorField.TOKEN) {
        localStorage.removeItem('token');

        return refreshTokenService.refreshToken().pipe(
          switchMap(() => {
            const newAcessToken = localStorage.getItem('token') ?? '';
            
            const authReq = req.clone({
              withCredentials: true,
              headers: req.headers.set('Authorization', `Bearer ${newAcessToken}`)
            });

            return next(authReq);
          }),
          catchError((err) => throwError(err))
        );
      }

      let toastOption: IToastOption | null = null;

      if(errObj.requiredCredentialsError) {
        toastOption = {
          severity: 'error',
          summary: 'Required Credentials Not Provided',
          detail: errObj.message
        }
      }else if(errObj.errorField === errorField.BLOCKED) {
        toastOption = {
          severity: 'warn',
          summary: errObj.message,
          detail: 'contact with admins.'
        }
      }else if(errObj.errorField === errorField.REFRESH_TOKEN && errObj.message !== ErrorMessage.NOT_AUTHENTICATED) {
        toastOption = {
          severity: 'warn',
          summary: "Token Error",
          detail: errObj.message
        }

        localStorage.removeItem('token');
      }else if(!errObj.errorField && errObj.message){
        toastOption = {
          severity: 'error',
          summary: 'Server Error',
          detail: 'Internal Server Error.'
        }

        console.error(errObj.message, "Error Server");
      }

      if(toastOption) {
        toastMessageService.showToast(toastOption);
      }

      return throwError(err);
    })
  );
};
