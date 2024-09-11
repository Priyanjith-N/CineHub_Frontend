import { Component } from '@angular/core';
import { SidebarMyTicketsComponent } from '../sidebar-my-tickets/sidebar-my-tickets.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [
    SidebarMyTicketsComponent,
    RouterOutlet
  ],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent {
  constructor(private router: Router) {
    if(this.router.url.substring(this.router.url.lastIndexOf('/')) === '/mytickets') this.router.navigate(['/mytickets/activetickets']);
  }
}
