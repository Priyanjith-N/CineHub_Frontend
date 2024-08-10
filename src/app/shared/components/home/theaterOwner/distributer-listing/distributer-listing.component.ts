import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-distributer-listing',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './distributer-listing.component.html',
  styleUrl: './distributer-listing.component.css'
})
export class DistributerListingComponent {
  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();
  }
}
