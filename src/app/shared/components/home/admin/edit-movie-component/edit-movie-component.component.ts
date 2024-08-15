import { Component } from '@angular/core';
import { AddEditMovieFormComponent } from '../add-edit-movie-form/add-edit-movie-form.component';

@Component({
  selector: 'app-edit-movie-component',
  standalone: true,
  imports: [
    AddEditMovieFormComponent
  ],
  templateUrl: './edit-movie-component.component.html',
  styleUrl: './edit-movie-component.component.css'
})
export class EditMovieComponentComponent {

}
