import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubHeaderComponent } from './user-sub-header.component';

describe('UserSubHeaderComponent', () => {
  let component: UserSubHeaderComponent;
  let fixture: ComponentFixture<UserSubHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSubHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
