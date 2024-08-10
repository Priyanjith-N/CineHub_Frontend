import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerListingComponent } from './distributer-listing.component';

describe('DistributerListingComponent', () => {
  let component: DistributerListingComponent;
  let fixture: ComponentFixture<DistributerListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
