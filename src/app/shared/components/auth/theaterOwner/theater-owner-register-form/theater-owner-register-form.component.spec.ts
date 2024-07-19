import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterOwnerRegisterFormComponent } from './theater-owner-register-form.component';

describe('TheaterOwnerRegisterFormComponent', () => {
  let component: TheaterOwnerRegisterFormComponent;
  let fixture: ComponentFixture<TheaterOwnerRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterOwnerRegisterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterOwnerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
