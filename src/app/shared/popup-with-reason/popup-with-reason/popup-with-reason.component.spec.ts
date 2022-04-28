import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWithReasonComponent } from './popup-with-reason.component';

describe('PopupWithReasonComponent', () => {
  let component: PopupWithReasonComponent;
  let fixture: ComponentFixture<PopupWithReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupWithReasonComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupWithReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
