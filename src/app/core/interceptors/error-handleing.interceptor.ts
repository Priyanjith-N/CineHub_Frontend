import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import IAllPossiableErrorResponse from '../../shared/models/errorHandleingInterceptorAllErrors.interface';
import IToastOption from '../../shared/models/IToastOption.interface';
import { ToastMessageService } from '../services/toast-message.service';
import { inject } from '@angular/core';

export const errorHandleingInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.substring(req.url.lastIndexOf('/')) === '/verifyToken') {
    return next(req);
  }

  const toastMessageService: ToastMessageService = inject(ToastMessageService);
  
  return next(req).pipe(
    catchError((err: any) => {
      if(!err.error) {
        return throwError(err);
      }

      const errObj: IAllPossiableErrorResponse = err.error as IAllPossiableErrorResponse;

      let toastOption: IToastOption | null = null;

      if(errObj.requiredCredentialsError) {
        toastOption = {
          severity: 'error',
          summary: 'Required Credentials Not Provided',
          detail: errObj.message
        }
      }else if(errObj.errorField === "blocked") {
        toastOption = {
          severity: 'warn',
          summary: errObj.message,
          detail: 'contact with admins.'
        }
      }else if(errObj.errorField === "Token") {
        toastOption = {
          severity: 'warn',
          summary: "Token Error",
          detail: errObj.message
        }
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
