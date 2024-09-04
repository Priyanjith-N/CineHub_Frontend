import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { DateFormatterPipe } from "../../../../pipes/date-formatter.pipe";
import { IMovieScheduleWithDetails } from "../../../../models/schedule.entity";

@Component({
  selector: 'app-date-slider-for-schedules',
  standalone: true,
  imports: [
    DateFormatterPipe
  ],
  templateUrl: './date-slider-for-schedules.component.html',
  styleUrl: './date-slider-for-schedules.component.css'
})
export class DateSliderForSchedulesComponent {
  @Input({ required: true }) data: IMovieScheduleWithDetails[] = [];
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
        perView: 6,
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
