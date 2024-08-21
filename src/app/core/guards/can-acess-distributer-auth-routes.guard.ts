import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { DistributerAuthService } from '../services/distributer-auth.service';
import { inject } from '@angular/core';

export const canAcessDistributerAuthRoutesGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const distributerAuthService: DistributerAuthService = inject(DistributerAuthService);
  
  const activeUrl: string = state.url;

  if(activeUrl === '/distributer/auth'){
    router.navigate(['/distributer/auth/login']);
    return false;
  }

  try {
    const token: string | null = localStorage.getItem('token');
    

    if(!token) throw new Error('NO TOKEN AVAILABLE');

    await distributerAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    router.navigate(['/distributer']);

    return false;
  } catch (err) {
    localStorage.removeItem('token');
    return true;
  }
};
