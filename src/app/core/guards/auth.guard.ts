import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const router: Router = inject(Router)

export const authGuard: CanActivateFn = (route, state) => {
  const url: string = router.url.substring(router.url.lastIndexOf('/'));
  if(url === '/auth'){
    router.navigate(['/auth/login']);
    return false;
  }
  
  return true;
};
