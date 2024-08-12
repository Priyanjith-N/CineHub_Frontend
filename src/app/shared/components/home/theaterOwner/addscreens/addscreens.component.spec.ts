import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscreensComponent } from './addscreens.component';

describe('AddscreensComponent', () => {
  let component: AddscreensComponent;
  let fixture: ComponentFixture<AddscreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddscreensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddscreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
