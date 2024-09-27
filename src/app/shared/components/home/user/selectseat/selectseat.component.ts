import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGetTheaterScreenLayoutSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { Observable } from 'rxjs';
import { UserService } from '../../../../../core/services/user.service';
import { IMovieSchedulesForBooking } from '../../../../models/schedule.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { CommonModule } from '@angular/common';
import { ISeatCategory, ISeatCategoryPattern, ISeatLayout } from '../../../../models/screen.entity';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import IToastOption from '../../../../models/IToastOption.interface';
import { BookseatdetailsService } from '../../../../../core/services/bookseatdetails.service';

@Component({
  selector: 'app-selectseat',
  standalone: true,
  imports: [
    DateFormatterPipe,
    FormatTimePipe,
    CommonModule
  ],
  templateUrl: './selectseat.component.html',
  styleUrl: './selectseat.component.css'
})
export class SelectseatComponent {
  private userService: UserService = inject(UserService);
  private bookseatdetailsService: BookseatdetailsService = inject(BookseatdetailsService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  theaterScreenLayout: IMovieSchedulesForBooking | undefined;
  seatNumberWiseImage: { startSeat: number, endSeat: number, imgURL: string }[];
  noOfTickets: number = 1;
  showTicketImageIdx: number = 0;
  changeTicketModal: boolean = true;
  selectedSeats: { rowIdx: number, colIdx: number }[] = [];
  totalAmount: number = 0;
  
  private scheduleId: string;

  constructor() {
    this.seatNumberWiseImage = [
      {
        startSeat: 1,
        endSeat: 1,
        imgURL: "assets/images/cyle.jpg"
      },
      {
        startSeat: 2,
        endSeat: 2,
        imgURL: "assets/images/scooter.jpg"
      },
      {
        startSeat: 3,
        endSeat: 3,
        imgURL: "assets/images/realistic-rikshaw.avif"
      },
      {
        startSeat: 4,
        endSeat: 4,
        imgURL: "assets/images/4 car.avif"
      },
      {
        startSeat: 5,
        endSeat: 7,
        imgURL: "assets/images/car.jpg"
      },
      {
        startSeat: 8,
        endSeat: 10,
        imgURL: "assets/images/van.jpg"
      },
    ]

    this.scheduleId = this.activatedRoute.snapshot.params['scheduleId'];

    const APIResponse$: Observable<IGetTheaterScreenLayoutSucessfullResponse> = this.userService.getTheaterScreenLayout(this.scheduleId);

    APIResponse$.subscribe(
      (res => {
        this.theaterScreenLayout = res.data;
      }),
      ((err: any) => {
      })
    );
  }

  selectSeat(rowIdx: number, colIdx: number) {
    if(!this.theaterScreenLayout) return;

    let isSelected: boolean = false;
    for(const seatCordinates of this.selectedSeats) {
      if(seatCordinates.rowIdx === rowIdx && seatCordinates.colIdx === colIdx) {
        isSelected = true;
        break;
      }
    }

    if(isSelected) {
      this.selectedSeats = this.selectedSeats.filter((seatCordinates) => {
        if(seatCordinates.rowIdx === rowIdx && seatCordinates.colIdx === colIdx) {
          this.totalAmount -= this.theaterScreenLayout!.seats[rowIdx][colIdx]!.price;
          return false;
        }

        return true;
      });
    }else if((this.selectedSeats.length + 1) <= this.noOfTickets){
      this.selectedSeats.push({
        rowIdx,
        colIdx
      });

      this.totalAmount += this.theaterScreenLayout.seats[rowIdx][colIdx]!.price;
    }
    
  }

  getPriceForSeatCategory(category: string): number {
    if(!this.theaterScreenLayout) return 0;
    for(const row of this.theaterScreenLayout.seats) {
      for(const seat of row) {
        if(seat && seat.category === category) return seat.price;
      }
    }
    return 0;
  }

  checkForAvaliableSeatsForCategory(category: string): boolean {
    if(!this.theaterScreenLayout) return false;

    for(const row of this.theaterScreenLayout.seats) {
      for(const seat of row) {
        if(seat && !seat.isBooked) return true;
      }
    }

    return false;
  }

  isSelected(rowIdx: number, colIdx: number): boolean {
    for(const seatCordinates of this.selectedSeats) {
      if(seatCordinates.rowIdx === rowIdx && seatCordinates.colIdx === colIdx) {
        return true
      };
    }

    return false;
  }

  openOrCloseChangeTicketModal() {
    this.changeTicketModal = !this.changeTicketModal;
  }

  chageNoOfTickets(noOfTickets: number) {
    this.noOfTickets = noOfTickets;
    this.selectedSeats = [];

    this.showTicketImageIdx = this.seatNumberWiseImage.findIndex((obj) => obj.startSeat <= this.noOfTickets && obj.endSeat >= this.noOfTickets);
  }

  getTickectsCount(): number[] {
    if(!this.theaterScreenLayout) return [];

    const limit = this.theaterScreenLayout.availableSeats >= 10 ? 10 : this.theaterScreenLayout.availableSeats;

    const arr = [];
    for(let i = 1 ; i <= limit ; i++) {
      arr.push(i);
    }

    return arr;
  }

  getSeatPrice(category: string): number {
    if(this.theaterScreenLayout)
    for(const row of this.theaterScreenLayout.seats) {
      for(const seat of row) {
        if(!seat) continue;

        if(seat.category === category) {
          return seat.price;
        }else{
          break;
        }
      }
    }
    return 0;
  }

  selectAndPay() {
    if(this.selectedSeats.length !== this.noOfTickets) {
      const toastOption: IToastOption = {
        severity: 'warn',
        summary: 'Seat Selection Incomplete',
        detail: `Please select ${this.noOfTickets} seats in total.`
      }

      this.showToast(toastOption);

      return;
    }

    const isCategoryTaken: Set<String> = new Set<string>();
    const selectedSeatCategorys: ISeatCategoryPattern[] = [];
    this.selectedSeats.forEach((seatIdx) => {
      const seat = this.theaterScreenLayout!.seats[seatIdx.rowIdx][seatIdx.colIdx]!;
      if(!isCategoryTaken.has(seat.category)) {
        isCategoryTaken.add(seat.category);
        
        selectedSeatCategorys.push({
          category: seat.category,
          price: seat.price
        });
      }
    });

    const selectedSeats: ISeatLayout[] = this.selectedSeats.map((seatIdx) => {
      const seat = this.theaterScreenLayout!.seats[seatIdx.rowIdx][seatIdx.colIdx]!;

      return {
        name: seat.name,
        category: seat.category,
        price: seat.price
      }
    })


    this.bookseatdetailsService.setValue({
      time: this.theaterScreenLayout!.startTime,
      selectedSeatsIdx: this.selectedSeats,
      scheduleId: this.scheduleId,
      date: this.theaterScreenLayout!.date,
      movieName: this.theaterScreenLayout!.movieData.name,
      category: selectedSeatCategorys,
      selectedSeats: selectedSeats
    });

    this.router.navigate(['bookseat', this.scheduleId, 'confirmpayment'])
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
