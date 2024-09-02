import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDetailsSliderComponent } from './worker-details-slider.component';

describe('WorkerDetailsSliderComponent', () => {
  let component: WorkerDetailsSliderComponent;
  let fixture: ComponentFixture<WorkerDetailsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerDetailsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDetailsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
