import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayrollActionCellRendererComponent } from './new-payroll-action-cell-renderer.component';

describe('NewPayrollActionCellRendererComponent', () => {
  let component: NewPayrollActionCellRendererComponent;
  let fixture: ComponentFixture<NewPayrollActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPayrollActionCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayrollActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
