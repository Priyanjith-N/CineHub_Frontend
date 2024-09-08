import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonMovieDeatilPageComponent } from './skeleton-movie-deatil-page.component';

describe('SkeletonMovieDeatilPageComponent', () => {
  let component: SkeletonMovieDeatilPageComponent;
  let fixture: ComponentFixture<SkeletonMovieDeatilPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonMovieDeatilPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonMovieDeatilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
