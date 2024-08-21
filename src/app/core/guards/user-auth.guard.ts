import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const userAuthService: UserAuthService = inject(UserAuthService);
  
  try {
    const token: string | null = localStorage.getItem('token');
    

    if(!token) throw new Error('NO TOKEN AVAILABLE');

    await userAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    return true;
  } catch (err) {
    // if you need put toast message here before navigating.
    localStorage.removeItem('token');
    router.navigate(['/auth/login']);
    return false;
  }
};
