import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSliderForSchedulesComponent } from './date-slider-for-schedules.component';

describe('DateSliderForSchedulesComponent', () => {
  let component: DateSliderForSchedulesComponent;
  let fixture: ComponentFixture<DateSliderForSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateSliderForSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSliderForSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
