import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { inject } from '@angular/core';

export const canAcessAdminAuthRoutesGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const adminAuthService: AdminAuthService = inject(AdminAuthService);
  
  const activeUrl: string = state.url;

  if(activeUrl === '/admin/auth'){
    router.navigate(['/admin/auth/login']);
    return false;
  }

  try {
    await adminAuthService.handelVerifyAuthTokenRequest(); // if it respond other than 200 status code promise will reject it comes in catch.

    router.navigate(['/admin']);

    return false;
  } catch (err) {
    return true;
  }
};
