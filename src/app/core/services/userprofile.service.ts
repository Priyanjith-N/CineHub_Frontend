import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserProfile } from '../../shared/models/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  private userProfileSubject = new BehaviorSubject<IUserProfile | null>(null);

  // Observable that components can subscribe to
  // here is the user profile
  userProfile$ = this.userProfileSubject.asObservable();

 setValue(value: IUserProfile | null) {
  this.userProfileSubject.next(value);
 }

 isNull(): boolean {
  if(!this.userProfileSubject.getValue()) return true;
  return false;
 }

 getValue(): IUserProfile {
   return this.userProfileSubject.getValue()!;
 }
}
