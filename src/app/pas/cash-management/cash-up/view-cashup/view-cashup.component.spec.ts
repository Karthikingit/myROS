import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCashupComponent } from './view-cashup.component';

describe('ViewCashupComponent', () => {
  let component: ViewCashupComponent;
  let fixture: ComponentFixture<ViewCashupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCashupComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCashupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
