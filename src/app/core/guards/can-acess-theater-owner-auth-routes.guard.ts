import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TheaterOwnerAuthService } from '../services/theater-owner-auth.service';

export const canAcessTheaterOwnerAuthRoutesGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const theaterOwnerAuthService: TheaterOwnerAuthService = inject(TheaterOwnerAuthService);
  
  const activeUrl: string = state.url;

  if(activeUrl === '/theaterOwner/auth'){
    router.navigate(['/theaterOwner/auth/login']);
    return false;
  }

  try {
    await theaterOwnerAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    router.navigate(['/theaterOwner']);

    return false;
  } catch (err) {
    return true;
  }
};
