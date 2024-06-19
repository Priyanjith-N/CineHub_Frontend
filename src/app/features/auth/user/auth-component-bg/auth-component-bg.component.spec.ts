import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponentBGComponent } from './auth-component-bg.component';

describe('AuthComponentBGComponent', () => {
  let component: AuthComponentBGComponent;
  let fixture: ComponentFixture<AuthComponentBGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponentBGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthComponentBGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
