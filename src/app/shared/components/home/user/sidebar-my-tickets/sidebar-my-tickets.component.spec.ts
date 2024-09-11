import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMyTicketsComponent } from './sidebar-my-tickets.component';

describe('SidebarMyTicketsComponent', () => {
  let component: SidebarMyTicketsComponent;
  let fixture: ComponentFixture<SidebarMyTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMyTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
