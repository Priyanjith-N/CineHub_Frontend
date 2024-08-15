import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMovieFormComponent } from './add-edit-movie-form.component';

describe('AddEditMovieFormComponent', () => {
  let component: AddEditMovieFormComponent;
  let fixture: ComponentFixture<AddEditMovieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMovieFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMovieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
