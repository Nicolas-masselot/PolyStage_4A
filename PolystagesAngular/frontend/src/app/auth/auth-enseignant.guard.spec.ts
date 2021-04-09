import { TestBed } from '@angular/core/testing';

import { AuthEnseignantGuard } from './auth-enseignant.guard';

describe('AuthEnseignantGuard', () => {
  let guard: AuthEnseignantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEnseignantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
