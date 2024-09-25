import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterOwnerDashboardComponent } from './theater-owner-dashboard.component';

describe('TheaterOwnerDashboardComponent', () => {
  let component: TheaterOwnerDashboardComponent;
  let fixture: ComponentFixture<TheaterOwnerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterOwnerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterOwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
