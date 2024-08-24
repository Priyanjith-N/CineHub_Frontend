import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.substring(req.url.lastIndexOf('/')).includes('/autocomplete') || req.url.substring(req.url.lastIndexOf('/')).includes('/reverse')) {
    return next(req);
  }
  const token: string = localStorage.getItem('token') ?? "";
  // clone req and make new request with option withCredentials true to allow cookies to send to backend.
  const authReq = req.clone({
    withCredentials: true,
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  // Pass the cloned request with the updated http option to the next handler or to backend.
  return next(authReq);
};