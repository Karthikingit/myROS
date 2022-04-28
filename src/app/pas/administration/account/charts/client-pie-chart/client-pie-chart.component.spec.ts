import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPieChartComponent } from './client-pie-chart.component';

describe('ClientPieChartComponent', () => {
  let component: ClientPieChartComponent;
  let fixture: ComponentFixture<ClientPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
