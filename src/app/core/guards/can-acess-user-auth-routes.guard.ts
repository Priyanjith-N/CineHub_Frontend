import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

export const canAcessUserAuthRoutesGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const userAuthService: UserAuthService = inject(UserAuthService);
  console.log(state.url);
  
  const activeUrl: string = state.url;

  if(activeUrl === '/auth'){
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    await userAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    router.navigate(['/']);

    return false;
  } catch (err) {
    return true;
  }
};
