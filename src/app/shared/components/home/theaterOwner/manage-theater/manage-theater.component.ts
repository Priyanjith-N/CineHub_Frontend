import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-theater',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './manage-theater.component.html',
  styleUrl: './manage-theater.component.css'
})
export class ManageTheaterComponent {
  isListed: boolean = true;

  changeItems() {
    this.isListed = !this.isListed;
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();
  }
}
