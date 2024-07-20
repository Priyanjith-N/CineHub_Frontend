import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerAccountNotVerifiedMessageComponent } from './distributer-account-not-verified-message.component';

describe('DistributerAccountNotVerifiedMessageComponent', () => {
  let component: DistributerAccountNotVerifiedMessageComponent;
  let fixture: ComponentFixture<DistributerAccountNotVerifiedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerAccountNotVerifiedMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributerAccountNotVerifiedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
