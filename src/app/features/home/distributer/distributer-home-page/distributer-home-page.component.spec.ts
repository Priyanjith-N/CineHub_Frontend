import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerHomePageComponent } from './distributer-home-page.component';

describe('DistributerHomePageComponent', () => {
  let component: DistributerHomePageComponent;
  let fixture: ComponentFixture<DistributerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
