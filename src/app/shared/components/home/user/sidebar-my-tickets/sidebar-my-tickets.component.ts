import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-my-tickets',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar-my-tickets.component.html',
  styleUrl: './sidebar-my-tickets.component.css'
})
export class SidebarMyTicketsComponent {

}
