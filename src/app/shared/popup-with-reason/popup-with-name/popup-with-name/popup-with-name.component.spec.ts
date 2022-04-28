import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWithNameComponent } from './popup-with-name.component';

describe('PopupWithNameComponent', () => {
  let component: PopupWithNameComponent;
  let fixture: ComponentFixture<PopupWithNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupWithNameComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupWithNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
