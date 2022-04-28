import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashUpComponent } from './cash-up.component';

describe('CashUpComponent', () => {
  let component: CashUpComponent;
  let fixture: ComponentFixture<CashUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashUpComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
