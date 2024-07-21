import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerOtpEmailVerificationFormComponent } from './distributer-otp-email-verification-form.component';

describe('DistributerOtpEmailVerificationFormComponent', () => {
  let component: DistributerOtpEmailVerificationFormComponent;
  let fixture: ComponentFixture<DistributerOtpEmailVerificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerOtpEmailVerificationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributerOtpEmailVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
