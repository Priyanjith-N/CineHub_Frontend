import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserprofileService } from '../services/userprofile.service';

export const canAcessUserAuthRoutesGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const userAuthService: UserAuthService = inject(UserAuthService);
  const userprofileService: UserprofileService = inject(UserprofileService);
  
  const activeUrl: string = state.url;

  if(activeUrl === '/auth'){
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    const token: string | null = localStorage.getItem('token');
    

    if(!token) throw new Error('NO TOKEN AVAILABLE');

    const res = await userAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    userprofileService.setValue(res!.data);

    router.navigate(['/']);

    return false;
  } catch (err) {
    userprofileService.setValue(null);
    localStorage.removeItem('token');
    return true;
  }
};
