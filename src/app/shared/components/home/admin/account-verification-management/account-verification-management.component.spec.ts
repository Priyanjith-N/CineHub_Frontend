import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountVerificationManagementComponent } from './account-verification-management.component';

describe('AccountVerificationManagementComponent', () => {
  let component: AccountVerificationManagementComponent;
  let fixture: ComponentFixture<AccountVerificationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountVerificationManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountVerificationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
