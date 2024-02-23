import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { acheteurGuardGuard } from './acheteur-guard.guard';

describe('acheteurGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => acheteurGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
