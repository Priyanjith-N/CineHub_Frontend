import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountVerificationDetailPageComponent } from './admin-account-verification-detail-page.component';

describe('AdminAccountVerificationDetailPageComponent', () => {
  let component: AdminAccountVerificationDetailPageComponent;
  let fixture: ComponentFixture<AdminAccountVerificationDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountVerificationDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAccountVerificationDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
