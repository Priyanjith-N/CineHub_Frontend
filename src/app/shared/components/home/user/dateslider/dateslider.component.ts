import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { IMovieSchedulesWithTheaterDetailsWithLocationDecoded } from "../../../../models/schedule.entity";
import { DateFormatterPipe } from "../../../../pipes/date-formatter.pipe";

@Component({
  selector: 'app-dateslider',
  standalone: true,
  imports: [
    DateFormatterPipe
  ],
  templateUrl: './dateslider.component.html',
  styleUrl: './dateslider.component.css'
})
export class DatesliderComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) data: IMovieSchedulesWithTheaterDetailsWithLocationDecoded[] = [];
  @Output() changeDateEvent: EventEmitter<Date> = new EventEmitter<Date>;
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined;
  selectedDate: number = 0;

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

  changeDate(idx: number) {
    this.selectedDate = idx;

    this.changeDateEvent.emit(this.data[idx].scheduledDate);
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
