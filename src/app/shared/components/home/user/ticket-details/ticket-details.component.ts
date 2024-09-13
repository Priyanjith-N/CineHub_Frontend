import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent {

}
