import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMovieCollectionComponent } from './my-movie-collection.component';

describe('MyMovieCollectionComponent', () => {
  let component: MyMovieCollectionComponent;
  let fixture: ComponentFixture<MyMovieCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMovieCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMovieCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
