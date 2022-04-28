import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashupSidebarComponent } from './cashup-sidebar.component';

describe('CashupSidebarComponent', () => {
  let component: CashupSidebarComponent;
  let fixture: ComponentFixture<CashupSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashupSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashupSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
