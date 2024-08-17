import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetAllMovieRequestsSucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { IMovieRequestDetails } from '../../../../models/requestMovie.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';

@Component({
  selector: 'app-my-movie-requests',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe
  ],
  templateUrl: './my-movie-requests.component.html',
  styleUrl: './my-movie-requests.component.css'
})
export class MyMovieRequestsComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private data: IMovieRequestDetails[] = [];
  displayData: IMovieRequestDetails[] = [];

  constructor() {
    const APIResponse$: Observable<IGetAllMovieRequestsSucessfullResponse> = this.theaterOwnerService.getAllMovieRequests();

    APIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.displayData = this.data;
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const searchText: string = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((req) => req.movieData.name.toLowerCase().startsWith(searchText) || req.distributerData.name.toLowerCase().startsWith(searchText));
  }
}
