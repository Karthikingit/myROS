import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ROSComponent } from "./pas.component";

describe("ROSComponent", () => {
  let component: ROSComponent;
  let fixture: ComponentFixture<ROSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ROSComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ROSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
