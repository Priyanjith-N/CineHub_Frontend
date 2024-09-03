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
  
  private scheduleId: string;

  constructor() {
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
