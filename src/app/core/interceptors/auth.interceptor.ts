import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string = localStorage.getItem('token') ?? "";
  // clone req and make new request with option withCredentials true to allow cookies to send to backend.
  const authReq = req.clone({
    withCredentials: true,
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  // Pass the cloned request with the updated http option to the next handler or to backend.
  return next(authReq);
};