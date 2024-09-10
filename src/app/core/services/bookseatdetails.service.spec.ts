import { TestBed } from '@angular/core/testing';

import { BookseatdetailsService } from './bookseatdetails.service';

describe('BookseatdetailsService', () => {
  let service: BookseatdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookseatdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
