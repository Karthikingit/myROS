import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayrollComponent } from './new-payroll.component';

describe('NewPayrollComponent', () => {
  let component: NewPayrollComponent;
  let fixture: ComponentFixture<NewPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
