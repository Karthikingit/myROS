import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentActionCellRenderComponent } from './department-action-cell-render.component';

describe('DepartmentActionCellRenderComponent', () => {
  let component: DepartmentActionCellRenderComponent;
  let fixture: ComponentFixture<DepartmentActionCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentActionCellRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentActionCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
