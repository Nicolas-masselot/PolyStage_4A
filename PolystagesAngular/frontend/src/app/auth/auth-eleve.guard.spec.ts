import { TestBed } from '@angular/core/testing';

import { AuthEleveGuard } from './auth-eleve.guard';

describe('AuthEleveGuard', () => {
  let guard: AuthEleveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEleveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
