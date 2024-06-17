import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpEmailVerificationFormComponent } from './otp-email-verification-form.component';

describe('OtpEmailVerificationFormComponent', () => {
  let component: OtpEmailVerificationFormComponent;
  let fixture: ComponentFixture<OtpEmailVerificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpEmailVerificationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpEmailVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
