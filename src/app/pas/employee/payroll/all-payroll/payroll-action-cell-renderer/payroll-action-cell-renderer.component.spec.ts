import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollActionCellRendererComponent } from './payroll-action-cell-renderer.component';

describe('PayrollActionCellRendererComponent', () => {
  let component: PayrollActionCellRendererComponent;
  let fixture: ComponentFixture<PayrollActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollActionCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
