import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './screens.component.html',
  styleUrl: './screens.component.css'
})
export class ScreensComponent {
  viewSeatArrangement: boolean = false;
  viewSeatNumberPattern: boolean = false;
  seatArrangment: (true | null)[][] = [];

  constructor() {
    this.seatArrangment = [
      [null, null, null, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, null, null, null],
      [true, true, true, null, null, true, true, true, true, true, true, true, true, true, true, true, true, true, null, null, true, true, true],
      [true, true, true, null, null, true, true, true, true, true, true, true, true, true, true, true, true, true, null, null, true, true, true],
      [true, true, true, null, null, true, true, true, true, true, true, true, true, true, true, true, true, true, null, null, true, true, true],
      [true, true, true, null, null, true, true, true, true, true, true, true, true, true, true, true, true, true, null, null, true, true, true],
      [true, true, true, null, null, true, true, true, true, true, true, true, true, true, true, true, true, true, null, null, true, true, true],
      [null, true, true, null, null, true, true, true, true, true, true, true, true, true, true, true, true, true, null, null, true, true, null],
    ]
  }

  openModal(modal: "seatArrangement" | "seatNumberPattern") {
    if(modal === 'seatArrangement') {
      this.viewSeatArrangement = true;
    }else if(modal === 'seatNumberPattern') {
      this.viewSeatNumberPattern = true;
    }
  }

  closeModal() {
    this.viewSeatArrangement = false;
    this.viewSeatNumberPattern = false;
  }
}
