import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerLoginFormComponent } from './distributer-login-form.component';

describe('DistributerLoginFormComponent', () => {
  let component: DistributerLoginFormComponent;
  let fixture: ComponentFixture<DistributerLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerLoginFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributerLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
