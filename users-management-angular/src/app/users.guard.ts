import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from './users.service';
import { inject } from '@angular/core';

// Existing guards
export const usersGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);
  if (usersService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  if (usersService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// New guard to prevent logged-in users from accessing login page
export const noAuthGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  if (usersService.isAuthenticated()) {
    // User is logged in, redirect them to appropriate page
    if (usersService.isAdmin()) {
      return router.createUrlTree(['/users']);
    } else {
      return router.createUrlTree(['/profile']);
    }
  }
  
  // User is not logged in, allow access
  return true;
};