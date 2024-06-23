import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const userAuthService: UserAuthService = inject(UserAuthService);
  
  try {
    await userAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    return true;
  } catch (err) {
    // if you need put toast message here before navigating.
    router.navigate(['/auth/login']);
    return false;
  }
};
