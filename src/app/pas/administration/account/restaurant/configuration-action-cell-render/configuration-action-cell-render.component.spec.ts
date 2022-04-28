import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationActionCellRenderComponent } from './configuration-action-cell-render.component';

describe('ConfigurationActionCellRenderComponent', () => {
  let component: ConfigurationActionCellRenderComponent;
  let fixture: ComponentFixture<ConfigurationActionCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationActionCellRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationActionCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
