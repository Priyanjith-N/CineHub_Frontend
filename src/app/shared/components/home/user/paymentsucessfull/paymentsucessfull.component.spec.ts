import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsucessfullComponent } from './paymentsucessfull.component';

describe('PaymentsucessfullComponent', () => {
  let component: PaymentsucessfullComponent;
  let fixture: ComponentFixture<PaymentsucessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsucessfullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsucessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
