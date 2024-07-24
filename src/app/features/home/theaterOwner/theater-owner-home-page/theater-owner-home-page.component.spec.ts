import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterOwnerHomePageComponent } from './theater-owner-home-page.component';

describe('TheaterOwnerHomePageComponent', () => {
  let component: TheaterOwnerHomePageComponent;
  let fixture: ComponentFixture<TheaterOwnerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterOwnerHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterOwnerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
