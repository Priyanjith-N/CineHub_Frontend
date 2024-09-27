import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IGetAllMoviesFromCollectionSucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { ITheaterOwnerMovieDetails } from '../../../../models/theaterOwnerCollection.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-my-movie-collection',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe,
    PaginationComponent
  ],
  templateUrl: './my-movie-collection.component.html',
  styleUrl: './my-movie-collection.component.css'
})
export class MyMovieCollectionComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);

  private data: ITheaterOwnerMovieDetails[] = [];
  displayData: ITheaterOwnerMovieDetails[] = [];

  constructor() {
    const APIResponse$: Observable<IGetAllMoviesFromCollectionSucessfullResponse> = this.theaterOwnerService.getallmoviesfromcollection();

    APIResponse$.subscribe((res) => {
      this.data = res.data;
      this.displayData = this.data;
    });
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((data) => {
      return (data.movieData.name.toLowerCase().startsWith(searchText));
    });
  }

  getData(pageNumber: number = 1) {
    
  }
}
