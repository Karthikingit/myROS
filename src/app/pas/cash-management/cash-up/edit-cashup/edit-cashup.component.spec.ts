import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCashupComponent } from './edit-cashup.component';

describe('EditCashupComponent', () => {
  let component: EditCashupComponent;
  let fixture: ComponentFixture<EditCashupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCashupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCashupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
