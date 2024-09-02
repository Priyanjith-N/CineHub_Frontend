import { AfterViewInit, Component, ElementRef, Input, input, OnDestroy, ViewChild } from '@angular/core';

import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { IMovie, IMovieWorkerDetails } from '../../../../models/IMovieCredentials.interface';
import IImage from '../../../../models/common.entity';

@Component({
  selector: 'app-worker-details-slider',
  standalone: true,
  imports: [],
  templateUrl: './worker-details-slider.component.html',
  styleUrl: './worker-details-slider.component.css'
})
export class WorkerDetailsSliderComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) workerDetails: IMovieWorkerDetails<IImage>[] = [];
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined;
  workerSlider: KeenSliderInstance | undefined;

  ngAfterViewInit() {
    if(!this.sliderRef){
      return;
    }
    
    this.workerSlider = new KeenSlider(this.sliderRef.nativeElement, {
      slides: {
        perView: 7,
        spacing: 32,
      },
    });
  }

  moveSlide(forward: boolean = true): void {
    if(!this.workerSlider){
      return;  
    }
    if(forward) {
      this.workerSlider.next();
    }else {
      this.workerSlider.prev();
    }
  }

  ngOnDestroy() {
    if (this.workerSlider) this.workerSlider.destroy();
  }
}
