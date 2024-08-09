import { TestBed } from '@angular/core/testing';

import { DistributerService } from './distributer.service';

describe('DistributerService', () => {
  let service: DistributerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
