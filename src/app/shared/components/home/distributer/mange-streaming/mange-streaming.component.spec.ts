import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeStreamingComponent } from './mange-streaming.component';

describe('MangeStreamingComponent', () => {
  let component: MangeStreamingComponent;
  let fixture: ComponentFixture<MangeStreamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangeStreamingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangeStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
