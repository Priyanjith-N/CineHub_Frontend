import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DocumentVerificationPendingMessagePageService } from '../services/document-verification-pending-message-page.service';

export const canAcessDocumentVerificationPendingPageGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const documentVerificationPendingMessagePageService: DocumentVerificationPendingMessagePageService = inject(DocumentVerificationPendingMessagePageService);

  const activeUrl: string = state.url.split('/')[1];
  const navigateUrl: string = `/${activeUrl}/auth/login`;
  

  const canAcess = documentVerificationPendingMessagePageService.getValue();
  if(canAcess) {
    documentVerificationPendingMessagePageService.setValue(false);
    return true;
  }

  router.navigate([navigateUrl]);
  
  return false;
};