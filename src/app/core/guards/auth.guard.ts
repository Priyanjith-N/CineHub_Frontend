import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const activeUrl: string = state.url.substring(state.url.lastIndexOf('/'));
  
  if(activeUrl === '/auth'){
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};