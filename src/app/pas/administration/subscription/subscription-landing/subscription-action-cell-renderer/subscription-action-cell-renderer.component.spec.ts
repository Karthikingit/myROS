import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionActionCellRendererComponent } from './subscription-action-cell-renderer.component';

describe('SubscriptionActionCellRendererComponent', () => {
  let component: SubscriptionActionCellRendererComponent;
  let fixture: ComponentFixture<SubscriptionActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionActionCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
