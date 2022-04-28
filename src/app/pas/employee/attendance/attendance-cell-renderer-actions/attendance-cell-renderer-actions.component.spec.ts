import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCellRendererActionsComponent } from './attendance-cell-renderer-actions.component';

describe('AttendanceCellRendererActionsComponent', () => {
  let component: AttendanceCellRendererActionsComponent;
  let fixture: ComponentFixture<AttendanceCellRendererActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCellRendererActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCellRendererActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
