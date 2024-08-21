import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const adminAuthService: AdminAuthService = inject(AdminAuthService);

  try {
    const token: string | null = localStorage.getItem('token');
    

    if(!token) throw new Error('NO TOKEN AVAILABLE');

    await adminAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    return true;
  } catch (err) {
    // if you need put toast message here before navigating.
    localStorage.removeItem('token');
    router.navigate(['/admin/auth/login']);
    return false;
  }
};
