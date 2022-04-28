import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftCalendarLandingComponent } from './shift-calendar-landing.component';

describe('ShiftCalendarLandingComponent', () => {
  let component: ShiftCalendarLandingComponent;
  let fixture: ComponentFixture<ShiftCalendarLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftCalendarLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftCalendarLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
