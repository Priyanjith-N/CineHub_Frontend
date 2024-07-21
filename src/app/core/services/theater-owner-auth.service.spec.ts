import { TestBed } from '@angular/core/testing';

import { TheaterOwnerAuthService } from './theater-owner-auth.service';

describe('TheaterOwnerAuthService', () => {
  let service: TheaterOwnerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheaterOwnerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
