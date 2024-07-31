import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAcessDistributerAuthRoutesGuard } from './can-acess-distributer-auth-routes.guard';

describe('canAcessDistributerAuthRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAcessDistributerAuthRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
