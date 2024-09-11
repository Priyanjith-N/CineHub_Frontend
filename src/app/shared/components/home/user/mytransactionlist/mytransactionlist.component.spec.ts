import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytransactionlistComponent } from './mytransactionlist.component';

describe('MytransactionlistComponent', () => {
  let component: MytransactionlistComponent;
  let fixture: ComponentFixture<MytransactionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MytransactionlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytransactionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
