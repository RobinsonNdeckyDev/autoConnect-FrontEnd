import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { proprietaireGuardGuard } from './proprietaire-guard.guard';

describe('proprietaireGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => proprietaireGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
