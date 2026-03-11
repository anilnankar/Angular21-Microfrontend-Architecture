import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const reverseAuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn) {
    router.navigate(['/todo']);
    return false;
  }

  return true;
};

