import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import IToastOption from '../../shared/models/IToastOption.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  private toastOptionSubject: Subject<IToastOption> = new Subject<IToastOption>;
  toastOption$: Observable<IToastOption> = this.toastOptionSubject.asObservable();

  showToast(toastOption: IToastOption) {
    this.toastOptionSubject.next(toastOption);
  }
}
