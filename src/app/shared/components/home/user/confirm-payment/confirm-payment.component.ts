import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { BookseatdetailsService } from '../../../../../core/services/bookseatdetails.service';
import { ISeatCategoryPattern, ISeatLayout } from '../../../../models/screen.entity';
import { DateFormaterToLocalStringPipe } from '../../../../pipes/date-formater-to-local-string.pipe';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [
    DateFormaterToLocalStringPipe,
    FormatTimePipe
  ],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.css'
})
export class ConfirmPaymentComponent {
  private location: Location = inject(Location);
  private bookseatdetailsService: BookseatdetailsService = inject(BookseatdetailsService);
  private router: Router = inject(Router);

  selectedSeats!: { scheduleId: string; movieName: string; date: Date; time: string; category: ISeatCategoryPattern[]; selectedSeats: ISeatLayout[]; selectedSeatsIdx: { rowIdx: number; colIdx: number; }[]; };

  constructor() {
    if(this.bookseatdetailsService.isNull()) {
      this.router.navigate(['/']);
    }else{
      this.selectedSeats = this.bookseatdetailsService.getValue();
    }
  }

  getAsString(getStringOf: "category" | "seatName") {
    if(getStringOf === "category") {
      const category: string[] = this.selectedSeats.category.map((category) => category.category);
      
      return category.join(', ');
    }

    const seat: string[] = this.selectedSeats.selectedSeats.map((seat) => seat.name);

    return seat.join(', ');
  }

  noOfSeatsOnCategory(category: string): number {
    let totalNumberOfSeatOnTheCategory: number = 0;

    this.selectedSeats.selectedSeats.forEach((seat) => {
      if(seat.category === category) totalNumberOfSeatOnTheCategory++;
    });

    return totalNumberOfSeatOnTheCategory;
  }

  getTotal(): number {
    return this.selectedSeats.selectedSeats.reduce((total, seat) => {
      return total += seat.price;
    }, 0) + (20 * this.selectedSeats.selectedSeats.length);
  }

  goBack() {
    this.location.back();
  }
}
