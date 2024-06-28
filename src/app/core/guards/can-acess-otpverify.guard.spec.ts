import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAcessOTPVerifyGuard } from './can-acess-otpverify.guard';

describe('canAcessOTPVerifyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAcessOTPVerifyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
