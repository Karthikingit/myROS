import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeActionCellRendererComponent } from './employee-action-cell-renderer.component';

describe('EmployeeActionCellRendererComponent', () => {
  let component: EmployeeActionCellRendererComponent;
  let fixture: ComponentFixture<EmployeeActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeActionCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
