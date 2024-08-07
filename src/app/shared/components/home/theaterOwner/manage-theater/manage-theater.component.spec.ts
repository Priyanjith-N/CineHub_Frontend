import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTheaterComponent } from './manage-theater.component';

describe('ManageTheaterComponent', () => {
  let component: ManageTheaterComponent;
  let fixture: ComponentFixture<ManageTheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTheaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
