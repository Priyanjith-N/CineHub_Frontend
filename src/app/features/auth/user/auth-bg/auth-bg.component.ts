import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-bg',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './auth-bg.component.html',
  styleUrl: './auth-bg.component.css'
})
export class AuthBGComponent {

}
