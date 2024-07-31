import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAcessAdminAuthRoutesGuard } from './can-acess-admin-auth-routes.guard';

describe('canAcessAdminAuthRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAcessAdminAuthRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
