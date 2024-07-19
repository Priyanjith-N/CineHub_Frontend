import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterOwnerOtpEmailVerifcationFormComponent } from './theater-owner-otp-email-verifcation-form.component';

describe('TheaterOwnerOtpEmailVerifcationFormComponent', () => {
  let component: TheaterOwnerOtpEmailVerifcationFormComponent;
  let fixture: ComponentFixture<TheaterOwnerOtpEmailVerifcationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterOwnerOtpEmailVerifcationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterOwnerOtpEmailVerifcationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
