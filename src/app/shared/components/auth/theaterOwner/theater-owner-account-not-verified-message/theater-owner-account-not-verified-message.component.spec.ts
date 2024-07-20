import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterOwnerAccountNotVerifiedMessageComponent } from './theater-owner-account-not-verified-message.component';

describe('TheaterOwnerAccountNotVerifiedMessageComponent', () => {
  let component: TheaterOwnerAccountNotVerifiedMessageComponent;
  let fixture: ComponentFixture<TheaterOwnerAccountNotVerifiedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterOwnerAccountNotVerifiedMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterOwnerAccountNotVerifiedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
