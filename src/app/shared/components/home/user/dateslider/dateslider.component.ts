import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-dateslider',
  standalone: true,
  imports: [],
  templateUrl: './dateslider.component.html',
  styleUrl: './dateslider.component.css'
})
export class DatesliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined;

  slider: KeenSliderInstance | undefined;

  ngAfterViewInit() {
    if(!this.sliderRef){
      return;
    }
    
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      slides: {
        perView: 5,
        spacing: 17.7,
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
