import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsActionCellRendererComponent } from './reports-action-cell-renderer.component';

describe('ReportsActionCellRendererComponent', () => {
  let component: ReportsActionCellRendererComponent;
  let fixture: ComponentFixture<ReportsActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsActionCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
