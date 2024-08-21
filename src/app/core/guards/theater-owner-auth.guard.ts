import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TheaterOwnerAuthService } from '../services/theater-owner-auth.service';
import { inject } from '@angular/core';

export const theaterOwnerAuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const theaterOwnerAuthService: TheaterOwnerAuthService = inject(TheaterOwnerAuthService);

  try {
    const token: string | null = localStorage.getItem('token');
    

    if(!token) throw new Error('NO TOKEN AVAILABLE');

    await theaterOwnerAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    return true;
  } catch (err) {
    // if you need put toast message here before navigating.
    localStorage.removeItem('token');
    router.navigate(['/theaterOwner/auth/login']);
    return false;
  }
};
