import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DateSliderForSchedulesComponent } from '../date-slider-for-schedules/date-slider-for-schedules.component';
import { Observable } from 'rxjs';
import { IGetallmoviescheduleSucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { IMovieScheduleWithDetails } from '../../../../models/schedule.entity';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';

@Component({
  selector: 'app-manage-schedule',
  standalone: true,
  imports: [
    RouterLink,
    DateSliderForSchedulesComponent,
    CommonModule,
    DateFormatterPipe,
    FormatTimePipe
  ],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.css'
})
export class ManageScheduleComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  private screenId: string;
  private theaterId: string;

  allMovieSchedules: IMovieScheduleWithDetails[] = [];
  displayData: IMovieScheduleWithDetails | null = null;

  constructor() {
    this.screenId = this.activatedRoute.snapshot.params['screenId'];
    this.theaterId = this.activatedRoute.parent!.snapshot.params['theaterId'];

    this.getAllMovieSchedules();
  }

  changeDate(changedDate: Date) {
    const date: Date = new Date(changedDate);
    
    date.setHours(0);
    date.setMinutes(0);
    
    this.displayData = this.allMovieSchedules.find((show) => {
      const showDate = new Date(show.scheduledDate).setHours(0, 0, 0, 0);
      const targetDate = new Date(date).setHours(0, 0, 0, 0);
    
      return showDate === targetDate;
    })!;    
  }

  private getAllMovieSchedules() {
    const APIResponse$: Observable<IGetallmoviescheduleSucessfullResponse> = this.theaterOwnerService.getAllMovieSchedule(this.screenId, this.theaterId);

    APIResponse$.subscribe(
      (res => {
        this.allMovieSchedules = res.data;
        this.changeDate(this.allMovieSchedules[0].scheduledDate!);
      }),
      ((err: any) => {
      })
    );
  }
}
