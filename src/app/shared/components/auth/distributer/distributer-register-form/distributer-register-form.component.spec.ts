import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerRegisterFormComponent } from './distributer-register-form.component';

describe('DistributerRegisterFormComponent', () => {
  let component: DistributerRegisterFormComponent;
  let fixture: ComponentFixture<DistributerRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerRegisterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
