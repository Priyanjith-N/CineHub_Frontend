import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterOwerLoginFormComponent } from './theater-owner-login-form.component';

describe('TheaterOwerLoginFormComponent', () => {
  let component: TheaterOwerLoginFormComponent;
  let fixture: ComponentFixture<TheaterOwerLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterOwerLoginFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterOwerLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
