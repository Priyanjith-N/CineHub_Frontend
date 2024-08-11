import { TestBed } from '@angular/core/testing';

import { TheaterOwnerService } from './theater-owner.service';

describe('TheaterOwnerService', () => {
  let service: TheaterOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheaterOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
