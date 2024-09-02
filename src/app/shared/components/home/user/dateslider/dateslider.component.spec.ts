import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesliderComponent } from './dateslider.component';

describe('DatesliderComponent', () => {
  let component: DatesliderComponent;
  let fixture: ComponentFixture<DatesliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatesliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
