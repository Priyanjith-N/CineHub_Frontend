import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCardSliderComponent } from './skeleton-card-slider.component';

describe('SkeletonCardSliderComponent', () => {
  let component: SkeletonCardSliderComponent;
  let fixture: ComponentFixture<SkeletonCardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCardSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
