import { Component, ElementRef, Input, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { IMovie } from "../../../../models/IMovieCredentials.interface";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.css'
})
export class CardSliderComponent {
  @Input({ required: true }) cardTitle: string = '';
  @Input({ required: true }) movies: IMovie[] = [];
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined;

  slider: KeenSliderInstance | undefined;

  ngAfterViewInit() {
    if(!this.sliderRef){
      return;
    }
    
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      slides: {
        perView: 3,
        spacing: 50,
      },
    })
  }

  moveSlide(forward: boolean = true): void {
    if(!this.slider){
      return;  
    }

    if (forward) {
      this.slider.next();
    } else {
      this.slider.prev();
    }
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
