import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { theaterOwnerAuthGuard } from './theater-owner-auth.guard';

describe('theaterOwnerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => theaterOwnerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
