import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-movie-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-movie-management.component.html',
  styleUrl: './admin-movie-management.component.css'
})
export class AdminMovieManagementComponent {
  isListed: boolean = true;

  changeItems() {
    this.isListed = !this.isListed;
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();
  }
}
