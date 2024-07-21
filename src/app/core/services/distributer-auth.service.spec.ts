import { TestBed } from '@angular/core/testing';

import { DistributerAuthService } from './distributer-auth.service';

describe('DistributerAuthService', () => {
  let service: DistributerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
