import { TestBed } from '@angular/core/testing';

import { DocumentVerificationPendingMessagePageService } from './document-verification-pending-message-page.service';

describe('DocumentVerificationPendingMessagePageService', () => {
  let service: DocumentVerificationPendingMessagePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentVerificationPendingMessagePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
