import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';

export const userAuthGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const userAuthService: UserAuthService = inject(UserAuthService);
  const userprofileService: UserprofileService = inject(UserprofileService);
  
  try {
    const res = await userAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    userprofileService.setValue(res!.data);

    return true;
  } catch (err) {
    userprofileService.setValue(null);
    // if you need put toast message here before navigating.
    
    router.navigate(['/auth/login']);
    return false;
  }
};
