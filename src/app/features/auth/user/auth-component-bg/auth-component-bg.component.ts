import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-component-bg',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './auth-component-bg.component.html',
  styleUrl: './auth-component-bg.component.css'
})
export class AuthComponentBGComponent {
  constructor(){

  }
}
