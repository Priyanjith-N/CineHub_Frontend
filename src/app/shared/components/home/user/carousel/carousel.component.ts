import { Component, ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined;

  slider: KeenSliderInstance | undefined;

  ngAfterViewInit() {
    if(!this.sliderRef){
      return;
    }
    
    this.slider = new KeenSlider(this.sliderRef.nativeElement);
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
