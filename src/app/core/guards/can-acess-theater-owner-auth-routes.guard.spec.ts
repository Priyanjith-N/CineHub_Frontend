import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAcessTheaterOwnerAuthRoutesGuard } from './can-acess-theater-owner-auth-routes.guard';

describe('canAcessTheaterOwnerAuthRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAcessTheaterOwnerAuthRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
