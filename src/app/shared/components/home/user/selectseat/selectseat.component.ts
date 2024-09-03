import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGetTheaterScreenLayoutSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { Observable } from 'rxjs';
import { UserService } from '../../../../../core/services/user.service';
import { IMovieSchedulesForBooking } from '../../../../models/schedule.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { CommonModule } from '@angular/common';
import { ISeatCategory } from '../../../../models/screen.entity';

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

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  theaterScreenLayout: IMovieSchedulesForBooking | undefined;
  seatNumberWiseImage: { startSeat: number, endSeat: number, imgURL: string }[];
  noOfTickets: number = 1;
  showTicketImageIdx: number = 0;
  changeTicketModal: boolean = true;
  selectedSeats: { rowIdx: number, colIdx: number }[] = [];
  
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
          console.error(err);
      })
    );
  }

  selectSeat(rowIdx: number, colIdx: number) {
    let isSelected: boolean = false;
    for(const seatCordinates of this.selectedSeats) {
      if(seatCordinates.rowIdx === rowIdx && seatCordinates.colIdx === colIdx) {
        isSelected = true;
        break;
      }
    }
    
    if(isSelected) {
      this.selectedSeats = this.selectedSeats.filter((seatCordinates) => !(seatCordinates.rowIdx === rowIdx && seatCordinates.colIdx === colIdx));
    }else if((this.selectedSeats.length + 1) <= this.noOfTickets){
      this.selectedSeats.push({
        rowIdx,
        colIdx
      })
    }
    
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
}
