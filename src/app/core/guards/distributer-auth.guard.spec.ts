import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { distributerAuthGuard } from './distributer-auth.guard';

describe('distributerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => distributerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
