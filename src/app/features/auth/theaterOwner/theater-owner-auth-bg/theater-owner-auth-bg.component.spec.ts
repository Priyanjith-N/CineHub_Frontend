import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterOwerAuthBgComponent } from './theater-owner-auth-bg.component';

describe('TheaterOwerAuthBgComponent', () => {
  let component: TheaterOwerAuthBgComponent;
  let fixture: ComponentFixture<TheaterOwerAuthBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterOwerAuthBgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterOwerAuthBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
