import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetMovieListOfDistributerDataAPISucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { IDistributerList } from '../../../../models/distributer.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';

@Component({
  selector: 'app-movie-lising-based-on-distributer',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe
  ],
  templateUrl: './movie-lising-based-on-distributer.component.html',
  styleUrl: './movie-lising-based-on-distributer.component.css'
})
export class MovieLisingBasedOnDistributerComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private data: IMovie[] = [];
  displayData: IMovie[] = [];
  distributerData: IDistributerList | null = null;

  constructor() {
    const distributerId: string = this.activatedRoute.snapshot.params['distributerId'];

    const getMovieListOfDistributerDataAPIResponse$: Observable<IGetMovieListOfDistributerDataAPISucessfullResponse> = this.theaterOwnerService.getMovieListOfDistributerData(distributerId);

    getMovieListOfDistributerDataAPIResponse$.subscribe(
      (res => {
        this.distributerData = res.data.distributer;
        this.data = res.data.movieList;
        this.displayData = this.data;
      })
    );
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((movie) => movie.name.toLowerCase().startsWith(searchText));
  }
}
