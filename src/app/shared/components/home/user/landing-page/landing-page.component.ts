import { Component } from '@angular/core';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { UserFooterComponent } from '../../../../../core/components/user-footer/user-footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CardSliderComponent,
    CarouselComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
