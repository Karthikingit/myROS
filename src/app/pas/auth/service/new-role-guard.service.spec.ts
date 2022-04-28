import { TestBed } from '@angular/core/testing';

import { NewRoleGuardService } from './new-role-guard.service';

describe('NewRoleGuardService', () => {
  let service: NewRoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRoleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
