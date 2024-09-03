import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLocationModalComponent } from './choose-location-modal.component';

describe('ChooseLocationModalComponent', () => {
  let component: ChooseLocationModalComponent;
  let fixture: ComponentFixture<ChooseLocationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseLocationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
