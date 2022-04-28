import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashupSummaryBoxComponent } from './cashup-summary-box.component';

describe('CashupSummaryBoxComponent', () => {
  let component: CashupSummaryBoxComponent;
  let fixture: ComponentFixture<CashupSummaryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashupSummaryBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashupSummaryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
