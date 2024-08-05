import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeMoviesComponent } from './distribute-movies.component';

describe('DistributeMoviesComponent', () => {
  let component: DistributeMoviesComponent;
  let fixture: ComponentFixture<DistributeMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributeMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributeMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
