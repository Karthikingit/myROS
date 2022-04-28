import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCashupComponent } from './all-cashup.component';

describe('AllCashupComponent', () => {
  let component: AllCashupComponent;
  let fixture: ComponentFixture<AllCashupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCashupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCashupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
