import { Component } from '@angular/core';

@Component({
  selector: 'app-add-movie-form',
  standalone: true,
  imports: [],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent {
  member: string | null = null;
  
  lauchAddModal(member: string) {
    this.member = member;
  }

  closeModal() {
    this.member = null;
  }
}
