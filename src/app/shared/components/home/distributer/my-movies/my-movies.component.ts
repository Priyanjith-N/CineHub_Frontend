import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DistributerService } from '../../../../../core/services/distributer.service';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { IMyDistributedMoviesSuccessfullResponse } from '../../../../models/IMovieAPIResponse.interface';
import { map, Observable } from 'rxjs';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';

@Component({
  selector: 'app-my-movies',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe
  ],
  templateUrl: './my-movies.component.html',
  styleUrl: './my-movies.component.css'
})
export class MyMoviesComponent {
  private distributerService: DistributerService = inject(DistributerService);
  
  private data: IMovie[] = [];
  displayData: IMovie[] = [];
  movieName: null | string = null;
  movieId: null | string = null;

  constructor() {
    this.getData();
  }

  private getData() {
    const getAllDistributedMoviesAPIResponse$: Observable<IMyDistributedMoviesSuccessfullResponse> = this.distributerService.getAllDistributedMovies();

    getAllDistributedMoviesAPIResponse$.subscribe(
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
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((movie) => movie.name.toLowerCase().startsWith(searchText));
  }

  openModal(id: string, movieName: string) {
    this.movieId = id;
    this.movieName = movieName;
  }

  closeModal() {
    this.movieId = null;
    this.movieName = null;
  }
}
