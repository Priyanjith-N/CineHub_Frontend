import { Component } from '@angular/core';
import { DatesliderComponent } from '../dateslider/dateslider.component';

@Component({
  selector: 'app-bookmovie',
  standalone: true,
  imports: [
    DatesliderComponent
  ],
  templateUrl: './bookmovie.component.html',
  styleUrl: './bookmovie.component.css'
})
export class BookmovieComponent {

}
