import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoviesComponent } from './my-movies.component';

describe('MyMoviesComponent', () => {
  let component: MyMoviesComponent;
  let fixture: ComponentFixture<MyMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
