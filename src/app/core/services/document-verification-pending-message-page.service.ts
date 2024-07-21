import { Injectable } from '@angular/core';
import { BehaviorSubject, flatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentVerificationPendingMessagePageService {
  private canLoadDocumentVerificationPendingPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  setValue(value: boolean) {
    this.canLoadDocumentVerificationPendingPage.next(value);
  }

  getValue(): boolean {
    return this.canLoadDocumentVerificationPendingPage.getValue();
  }
}
