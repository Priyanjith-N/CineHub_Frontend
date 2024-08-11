import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLisingBasedOnDistributerComponent } from './movie-lising-based-on-distributer.component';

describe('MovieLisingBasedOnDistributerComponent', () => {
  let component: MovieLisingBasedOnDistributerComponent;
  let fixture: ComponentFixture<MovieLisingBasedOnDistributerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieLisingBasedOnDistributerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieLisingBasedOnDistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
