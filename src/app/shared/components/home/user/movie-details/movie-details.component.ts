import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements AfterViewInit, OnDestroy {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private movieId: string;

  @ViewChild("sliderRef_1") sliderRef_1: ElementRef<HTMLElement> | undefined;
  @ViewChild("sliderRef_2") sliderRef_2: ElementRef<HTMLElement> | undefined;
  castSlider: KeenSliderInstance | undefined;
  crewSlider: KeenSliderInstance | undefined;

  constructor() {
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
  }

  ngAfterViewInit() {
    if(!this.sliderRef_1 || !this.sliderRef_2){
      return;
    }
    
    this.castSlider = new KeenSlider(this.sliderRef_1.nativeElement, {
      slides: {
        perView: 7,
        spacing: 32,
      },
    });

    this.crewSlider = new KeenSlider(this.sliderRef_2.nativeElement, {
      slides: {
        perView: 7,
        spacing: 32,
      },
    });
  }

  moveSlide(forward: boolean = true, slide: "cast" | "crew"): void {
    if(!this.castSlider || !this.crewSlider){
      return;  
    }
    if(forward && slide === "cast") {
      this.castSlider.next();
    }else if(!forward && slide === "cast") {
      this.castSlider.prev();
    }else if(forward && slide === "crew") {
      this.crewSlider.next();
    }else if(!forward && slide === "crew") {
      this.crewSlider.prev();
    }
  }

  ngOnDestroy() {
    if (this.castSlider) this.castSlider.destroy()
    if (this.crewSlider) this.crewSlider.destroy()
  }

}
