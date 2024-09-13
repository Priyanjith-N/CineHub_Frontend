import { Component, inject } from '@angular/core';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { IHomeMovieData } from '../../../../models/schedule.entity';
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { IGetDataForHomePageSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { SkeletonCardSliderComponent } from '../../../skeleton/user/skeleton-card-slider/skeleton-card-slider.component';
import { SkeletonCarouselComponent } from '../../../skeleton/user/skeleton-carousel/skeleton-carousel.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SkeletonCardSliderComponent,
    SkeletonCarouselComponent,
    CardSliderComponent,
    CarouselComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  private userService: UserService = inject(UserService);

  isDataRetriving: boolean = true;
  private data: IHomeMovieData | undefined;

  nowPlayingMovies: IMovie[] = [];
  recommendedMovies: IMovie[] = [];
  upcommingMovies: IMovie[] = [];
  streamingMovies: IMovie[] = [];


  constructor() {
    const APIResponse$: Observable<IGetDataForHomePageSucessfullResponse> = this.userService.getDataForHomePage();

    APIResponse$.subscribe(
      (res => {
        this.isDataRetriving = false;
        this.data = res.data;

        this.nowPlayingMovies = this.data.nowPlayingMovies;
        this.recommendedMovies = this.data.recommendedMovies;
        this.upcommingMovies = this.data.upcommingMovies;
        this.streamingMovies = this.data.streamingMovies;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }
}
