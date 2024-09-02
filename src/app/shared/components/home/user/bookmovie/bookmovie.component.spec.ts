import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmovieComponent } from './bookmovie.component';

describe('BookmovieComponent', () => {
  let component: BookmovieComponent;
  let fixture: ComponentFixture<BookmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
