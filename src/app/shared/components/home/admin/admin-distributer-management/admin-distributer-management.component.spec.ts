import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistributerManagementComponent } from './admin-distributer-management.component';

describe('AdminDistributerManagementComponent', () => {
  let component: AdminDistributerManagementComponent;
  let fixture: ComponentFixture<AdminDistributerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDistributerManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDistributerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
