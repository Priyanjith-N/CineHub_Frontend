import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const canAcessOTPVerifyGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const cookieService: CookieService = inject(CookieService);
  const emailRegex: RegExp = /^[A-Za-z0-9]+@gmail\.com$/;

  const isEmailInCookie: string = cookieService.get('emailToBeVerified');

  if(!isEmailInCookie || !emailRegex.test(isEmailInCookie)) {
    cookieService.delete('emailToBeVerified');
    router.navigate(['/auth/login']);
    return false;
  }
  
  return true;
};
