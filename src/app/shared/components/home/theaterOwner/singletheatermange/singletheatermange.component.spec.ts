import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletheatermangeComponent } from './singletheatermange.component';

describe('SingletheatermangeComponent', () => {
  let component: SingletheatermangeComponent;
  let fixture: ComponentFixture<SingletheatermangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingletheatermangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingletheatermangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
