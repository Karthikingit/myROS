import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSchedularComponent } from './shift-schedular.component';

describe('ShiftSchedularComponent', () => {
  let component: ShiftSchedularComponent;
  let fixture: ComponentFixture<ShiftSchedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSchedularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftSchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
