import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectMovieRequestComponent } from './approve-reject-movie-request.component';

describe('ApproveRejectMovieRequestComponent', () => {
  let component: ApproveRejectMovieRequestComponent;
  let fixture: ComponentFixture<ApproveRejectMovieRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveRejectMovieRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRejectMovieRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
