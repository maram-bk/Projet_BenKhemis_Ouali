import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  let stateConnexion = localStorage.getItem('state');
  if (stateConnexion == 'connected')
    return true;
  else {
    router.navigate(['/admin/login']);
    return false;
  }
};
