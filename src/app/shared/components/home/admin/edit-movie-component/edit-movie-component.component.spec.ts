import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieComponentComponent } from './edit-movie-component.component';

describe('EditMovieComponentComponent', () => {
  let component: EditMovieComponentComponent;
  let fixture: ComponentFixture<EditMovieComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMovieComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMovieComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
