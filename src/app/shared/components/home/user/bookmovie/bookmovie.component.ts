import { Component, inject } from '@angular/core';
import { DatesliderComponent } from '../dateslider/dateslider.component';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { UserService } from '../../../../../core/services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IGetAllShowsForAMovieSucessfullResponse, IGetMovieDetailsSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { IMovieSchedulesWithTheaterDetails, ISelectedShowDetails } from '../../../../models/schedule.entity';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';

@Component({
  selector: 'app-bookmovie',
  standalone: true,
  imports: [
    DatesliderComponent,
    FormatTimePipe,
    DateFormatterPipe,
    RouterLink
  ],
  templateUrl: './bookmovie.component.html',
  styleUrl: './bookmovie.component.css'
})
export class BookmovieComponent {
  private userService: UserService = inject(UserService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private movieId: string;
  movieData: IMovie | undefined;
  allShows: IMovieSchedulesWithTheaterDetails[] = [];
  selectedShowDetails: ISelectedShowDetails | null = null;
  selectedScheduleId: string | null = null;

  constructor() {
    this.movieId = this.activatedRoute.snapshot.params['movieId'];

    const APIResponse1$: Observable<IGetMovieDetailsSucessfullResponse> = this.userService.getMovieDetails(this.movieId);

    APIResponse1$.subscribe(
      (res => {
        this.movieData = res.data;
      }),
      ((err: any) => {
        console.error(err);
      })
    );

    const APIResponse2$: Observable<IGetAllShowsForAMovieSucessfullResponse> = this.userService.getAllShowsForAMovie(this.movieId);

    APIResponse2$.subscribe(
      (res => {
        this.allShows = res.data;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  selectSchedule(scheduleId: string, theaterId: string) {
    this.selectedScheduleId = scheduleId;

    const shows = this.allShows.find((schedule) => schedule.theaterData._id.toString() === theaterId.toString())!;

    const schedule = shows.schedules.find((schedule) => schedule.scheduleId.toString() === scheduleId.toString())!;

    this.selectedShowDetails = {
      scheduledDate: shows.scheduledDate,
      scheduleId: schedule.scheduleId,
      theaterName: shows.theaterData.name,
      time: schedule.startTime
    }
  }

}
