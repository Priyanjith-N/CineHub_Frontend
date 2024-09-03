import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationSubject = new BehaviorSubject<{ latitude: number, longitude: number, city: string } | null>(null);

   // Observable that components can subscribe to
   location$ = this.locationSubject.asObservable();

  setValue(value: { latitude: number, longitude: number, city: string }) {
    this.locationSubject.next(value);
  }

  isLocationNull(): boolean {
    if(!this.locationSubject.getValue()) return true;
    return false;
  }

  getValue(): { latitude: number, longitude: number, city: string } {
    return this.locationSubject.getValue()!;
  }
}
