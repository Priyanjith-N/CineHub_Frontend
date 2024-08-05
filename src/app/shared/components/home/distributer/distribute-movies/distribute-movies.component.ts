import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-distribute-movies',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './distribute-movies.component.html',
  styleUrl: './distribute-movies.component.css'
})
export class DistributeMoviesComponent {
  movieName: null | string = null;
  movieId: null | string = null;

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();
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
