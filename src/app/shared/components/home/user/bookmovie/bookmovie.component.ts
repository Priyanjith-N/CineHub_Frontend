import { Component, inject } from '@angular/core';
import { DatesliderComponent } from '../dateslider/dateslider.component';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { UserService } from '../../../../../core/services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IGetAllShowsForAMovieSucessfullResponse, IGetMovieDetailsSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { IMovieSchedulesWithTheaterDetails, IMovieSchedulesWithTheaterDetailsWithLocationDecoded, ISelectedShowDetails, ITheaterLocationDecoded } from '../../../../models/schedule.entity';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { AddressSearchService } from '../../../../../core/services/address-search.service';

import { GeoJsonProperties } from 'geojson';
import { LocationService } from '../../../../../core/services/location.service';
import { ChooseLocationModalComponent } from '../../../modal/choose-location-modal/choose-location-modal.component';
import { DateFormaterToLocalStringPipe } from '../../../../pipes/date-formater-to-local-string.pipe';

@Component({
  selector: 'app-bookmovie',
  standalone: true,
  imports: [
    DatesliderComponent,
    FormatTimePipe,
    RouterLink,
    ChooseLocationModalComponent,
    DateFormaterToLocalStringPipe
  ],
  templateUrl: './bookmovie.component.html',
  styleUrl: './bookmovie.component.css'
})
export class BookmovieComponent {
  private userService: UserService = inject(UserService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private addressSearchService: AddressSearchService = inject(AddressSearchService);
  private locationService: LocationService = inject(LocationService);

  private movieId: string;
  movieData: IMovie | undefined;
  allShows: IMovieSchedulesWithTheaterDetailsWithLocationDecoded[] = [];
  displayData: IMovieSchedulesWithTheaterDetailsWithLocationDecoded[] = [];
  selectedShowDetails: ISelectedShowDetails | null = null;
  selectedScheduleId: string | null = null;
  currentLocation: { latitude: number; longitude: number; city: string; } | null = null; 
  openChooseLocationModal: boolean = false;

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

    this.getAllShowsForAMovieSucessfullResponse();

    this.locationService.location$.subscribe(
      (value => {
        this.currentLocation = value;
        this.getAllShowsForAMovieSucessfullResponse();
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  private getAllShowsForAMovieSucessfullResponse() {
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
    const allShows: IMovieSchedulesWithTheaterDetailsWithLocationDecoded[] = [];
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

      allShows.push({
        scheduledDate: show.scheduledDate,
        schedules: show.schedules,
        theaterData
      });
    }

    this.allShows = allShows;

    this.allShows.sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

    if(this.allShows.length) {
      this.locationBasedListing(this.currentLocation!.city);
      this.changeDate(this.allShows[0].scheduledDate);
    }
  }

  showOrCloseChooseLocationModal(status: boolean) {
    this.openChooseLocationModal = status;
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

  changeDate(changedDate: Date) {
    const date: Date = new Date(changedDate);
    
    date.setHours(0);
    date.setMinutes(0);
    
    this.displayData = this.allShows.filter((show) => {
      const showDate = new Date(show.scheduledDate).setHours(0, 0, 0, 0);
      const targetDate = new Date(date).setHours(0, 0, 0, 0);
    
      return showDate === targetDate;
    });    
  }

  locationBasedListing(city: string) {
    this.allShows = this.allShows.filter((show) => show.theaterData.location.city === city);
  }
}
