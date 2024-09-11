import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyactiveTicketsComponent } from './myactive-tickets.component';

describe('MyactiveTicketsComponent', () => {
  let component: MyactiveTicketsComponent;
  let fixture: ComponentFixture<MyactiveTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyactiveTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyactiveTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
