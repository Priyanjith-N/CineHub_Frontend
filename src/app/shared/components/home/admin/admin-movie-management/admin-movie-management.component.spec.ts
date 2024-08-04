import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieManagementComponent } from './admin-movie-management.component';

describe('AdminMovieManagementComponent', () => {
  let component: AdminMovieManagementComponent;
  let fixture: ComponentFixture<AdminMovieManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMovieManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMovieManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
