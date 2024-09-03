import { Component, inject } from '@angular/core';
import { DatesliderComponent } from '../dateslider/dateslider.component';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { UserService } from '../../../../../core/services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IGetAllShowsForAMovieSucessfullResponse, IGetMovieDetailsSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { IMovieSchedulesWithTheaterDetails, IMovieSchedulesWithTheaterDetailsWithLocationDecoded, ISelectedShowDetails, ITheaterLocationDecoded } from '../../../../models/schedule.entity';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { AddressSearchService } from '../../../../../core/services/address-search.service';

import { GeoJsonProperties } from 'geojson';

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
  private addressSearchService: AddressSearchService = inject(AddressSearchService);

  private movieId: string;
  movieData: IMovie | undefined;
  allShows: IMovieSchedulesWithTheaterDetailsWithLocationDecoded[] = [];
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
        this.setLocation(res.data);
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  private async setLocation(shows: IMovieSchedulesWithTheaterDetails[]) {
    this.allShows = [];
    for(const show of shows) {
        const address: Promise<{ city: string, address: string }> = new Promise((resolve, reject) => {
          this.addressSearchService.reverseGeoCoding(show.theaterData.location.lat, show.theaterData.location.lng).subscribe(
            (res => {
              if(res?.results) {
                const properites: GeoJsonProperties = res.results[0] as GeoJsonProperties;
      
                if(properites) {
                  resolve({
                    city: properites['city'],
                    address: properites['formatted']
                  })
                }
              }
            }),
            ((err: any) => {
              console.log(err);
              reject(err);
            })
          );
        });

        const theaterData: ITheaterLocationDecoded = {
          _id: show.theaterData._id,
          images: show.theaterData.images,
          isListed: show.theaterData.isListed,
          licence: show.theaterData.licence,
          location: await address,
          name: show.theaterData.name,
          numberOfScreen: show.theaterData.numberOfScreen,
          ownerId: show.theaterData.ownerId,
        }

        this.allShows.push({
          scheduledDate: show.scheduledDate,
          schedules: show.schedules,
          theaterData
        });
    }
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
