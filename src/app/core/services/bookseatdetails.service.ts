import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISeatCategoryPattern, ISeatLayout } from '../../shared/models/screen.entity';

@Injectable({
  providedIn: 'root'
})
export class BookseatdetailsService {
  private bookingSeatSubject = new BehaviorSubject<{ scheduleId: string, movieName: string, date: Date, time: string, category: ISeatCategoryPattern[], selectedSeats: ISeatLayout[], selectedSeatsIdx: { rowIdx: number, colIdx: number }[] } | null>(null);

   // Observable that components can subscribe to
   bookingSeat$ = this.bookingSeatSubject.asObservable();

  setValue(value: { scheduleId: string, movieName: string, date: Date, time: string, category: ISeatCategoryPattern[], selectedSeats: ISeatLayout[], selectedSeatsIdx: { rowIdx: number, colIdx: number }[] } | null) {
    this.bookingSeatSubject.next(value);
  }

  isNull(): boolean {
    if(!this.bookingSeatSubject.getValue()) return true;
    return false;
  }

  getValue(): { scheduleId: string, movieName: string, date: Date, time: string, category: ISeatCategoryPattern[], selectedSeats: ISeatLayout[], selectedSeatsIdx: { rowIdx: number, colIdx: number }[] } {
    return this.bookingSeatSubject.getValue()!;
  }
}
