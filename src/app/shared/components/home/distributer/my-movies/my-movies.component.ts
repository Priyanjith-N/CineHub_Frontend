import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-movies',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './my-movies.component.html',
  styleUrl: './my-movies.component.css'
})
export class MyMoviesComponent {
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
