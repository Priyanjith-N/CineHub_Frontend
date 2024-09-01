import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCarouselComponent } from './skeleton-carousel.component';

describe('SkeletonCarouselComponent', () => {
  let component: SkeletonCarouselComponent;
  let fixture: ComponentFixture<SkeletonCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
