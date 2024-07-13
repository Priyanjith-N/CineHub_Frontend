import { Component } from '@angular/core';
import { CardSliderComponent } from '../card-slider/card-slider.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CardSliderComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
