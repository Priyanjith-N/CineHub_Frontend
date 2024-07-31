import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { DistributerAuthService } from '../services/distributer-auth.service';

export const distributerAuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const distributerAuthService: DistributerAuthService = inject(DistributerAuthService);

  try {
    await distributerAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    return true;
  } catch (err) {
    // if you need put toast message here before navigating.
    router.navigate(['/distributer/auth/login']);
    return false;
  }
};
