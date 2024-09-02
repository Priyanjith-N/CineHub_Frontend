import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { IGetMovieDetailsSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { WorkerDetailsSliderComponent } from '../worker-details-slider/worker-details-slider.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    DateFormatterPipe,
    WorkerDetailsSliderComponent,
    RouterLink
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  private userService: UserService = inject(UserService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private movieId: string;
  movieData: IMovie | undefined;

  constructor() {
    this.movieId = this.activatedRoute.snapshot.params['movieId'];

    const APIResponse$: Observable<IGetMovieDetailsSucessfullResponse> = this.userService.getMovieDetails(this.movieId);

    APIResponse$.subscribe(
      (res => {
        this.movieData = res.data;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }
}
