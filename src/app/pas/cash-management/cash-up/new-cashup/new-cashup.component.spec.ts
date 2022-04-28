import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCashupComponent } from './new-cashup.component';

describe('NewCashupComponent', () => {
  let component: NewCashupComponent;
  let fixture: ComponentFixture<NewCashupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCashupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCashupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
