import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionLandingComponent } from './subscription-landing.component';

describe('SubscriptionLandingComponent', () => {
  let component: SubscriptionLandingComponent;
  let fixture: ComponentFixture<SubscriptionLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
