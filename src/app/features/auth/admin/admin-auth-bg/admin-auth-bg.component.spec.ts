import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthBGComponent } from './admin-auth-bg.component';

describe('AdminAuthBGComponent', () => {
  let component: AdminAuthBGComponent;
  let fixture: ComponentFixture<AdminAuthBGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthBGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAuthBGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
