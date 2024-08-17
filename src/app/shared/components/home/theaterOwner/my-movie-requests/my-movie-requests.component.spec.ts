import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMovieRequestsComponent } from './my-movie-requests.component';

describe('MyMovieRequestsComponent', () => {
  let component: MyMovieRequestsComponent;
  let fixture: ComponentFixture<MyMovieRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMovieRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMovieRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
