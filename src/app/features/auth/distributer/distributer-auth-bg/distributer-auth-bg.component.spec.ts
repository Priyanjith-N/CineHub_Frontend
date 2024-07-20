import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerAuthBgComponent } from './distributer-auth-bg.component';

describe('DistributerAuthBgComponent', () => {
  let component: DistributerAuthBgComponent;
  let fixture: ComponentFixture<DistributerAuthBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerAuthBgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributerAuthBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
