import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpEmailVerificationPageComponent } from './otp-email-verification-page.component';

describe('OtpEmailVerificationPageComponent', () => {
  let component: OtpEmailVerificationPageComponent;
  let fixture: ComponentFixture<OtpEmailVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpEmailVerificationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpEmailVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
