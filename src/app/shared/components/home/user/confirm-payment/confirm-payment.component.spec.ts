import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPaymentComponent } from './confirm-payment.component';

describe('ConfirmPaymentComponent', () => {
  let component: ConfirmPaymentComponent;
  let fixture: ComponentFixture<ConfirmPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
