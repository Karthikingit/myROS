import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewsubscriptionComponent } from './addnewsubscription.component';

describe('AddnewsubscriptionComponent', () => {
  let component: AddnewsubscriptionComponent;
  let fixture: ComponentFixture<AddnewsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewsubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
