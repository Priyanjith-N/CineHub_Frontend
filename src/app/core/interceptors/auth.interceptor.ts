import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('ksfhjkhkj');
  
  // clone req and make new request with option withCredentials true to allow cookies to send to backend.
  const authReq = req.clone({
    withCredentials: true
  });

  // Pass the cloned request with the updated http option to the next handler or to backend.
  return next(authReq);
};
