import { Component } from '@angular/core';
import { AddEditMovieFormComponent } from '../add-edit-movie-form/add-edit-movie-form.component';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    AddEditMovieFormComponent
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent {

}
