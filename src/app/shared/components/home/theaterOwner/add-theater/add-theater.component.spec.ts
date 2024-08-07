import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTheaterComponent } from './add-theater.component';

describe('AddTheaterComponent', () => {
  let component: AddTheaterComponent;
  let fixture: ComponentFixture<AddTheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTheaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
