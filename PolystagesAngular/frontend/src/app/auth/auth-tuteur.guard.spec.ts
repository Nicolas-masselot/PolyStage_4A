import { TestBed } from '@angular/core/testing';

import { AuthTuteurGuard } from './auth-tuteur.guard';

describe('AuthTuteurGuard', () => {
  let guard: AuthTuteurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthTuteurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
