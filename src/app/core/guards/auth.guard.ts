import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

export const userAuthRouteGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const userAuthService: UserAuthService = inject(UserAuthService);

  const activeUrl: string = state.url.substring(state.url.lastIndexOf('/'));
  
  if(activeUrl === '/auth'){
    router.navigate(['/auth/login']);
    return false;
  }
  
  try {
    await userAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    router.navigate(['/']); // if the status code is 200 it means it is a vaild token user should not asseccs routes for making user authenticate.
    return false;
  } catch (err) {
    return true;
  }
};