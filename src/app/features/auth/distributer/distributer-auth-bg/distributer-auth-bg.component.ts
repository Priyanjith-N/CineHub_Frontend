import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-distributer-auth-bg',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './distributer-auth-bg.component.html',
  styleUrl: './distributer-auth-bg.component.css'
})
export class DistributerAuthBgComponent {

}