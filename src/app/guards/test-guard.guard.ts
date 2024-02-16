import { CanActivateFn } from '@angular/router';

export const testGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
