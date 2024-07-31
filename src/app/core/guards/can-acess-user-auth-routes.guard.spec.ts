import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAcessUserAuthRoutesGuard } from './can-acess-user-auth-routes.guard';

describe('canAcessUserAuthRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAcessUserAuthRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
