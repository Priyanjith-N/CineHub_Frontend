import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotVerifiedMessageComponent } from './account-not-verified-message.component';

describe('AccountNotVerifiedMessageComponent', () => {
  let component: AccountNotVerifiedMessageComponent;
  let fixture: ComponentFixture<AccountNotVerifiedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountNotVerifiedMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountNotVerifiedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
