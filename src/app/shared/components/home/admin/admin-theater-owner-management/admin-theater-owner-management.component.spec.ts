import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTheaterOwnerManagementComponent } from './admin-theater-owner-management.component';

describe('AdminTheaterOwnerManagementComponent', () => {
  let component: AdminTheaterOwnerManagementComponent;
  let fixture: ComponentFixture<AdminTheaterOwnerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTheaterOwnerManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTheaterOwnerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
