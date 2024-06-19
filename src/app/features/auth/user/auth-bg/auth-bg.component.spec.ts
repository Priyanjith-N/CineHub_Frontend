import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBGComponent } from './auth-bg.component';

describe('AuthBGComponent', () => {
  let component: AuthBGComponent;
  let fixture: ComponentFixture<AuthBGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthBGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
