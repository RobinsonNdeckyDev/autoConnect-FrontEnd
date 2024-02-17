import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { testGuardGuard } from './test-guard.guard';

describe('testGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => testGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
