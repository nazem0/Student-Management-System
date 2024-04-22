import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHelper } from '../helpers/auth-helper';
import { MatSnackBar } from '@angular/material/snack-bar';

export const userGuard: CanActivateFn = (route, state) => {
  let authorized = inject(AuthHelper).checkHasToken();
  if(!authorized){
    inject(MatSnackBar).open("You have to login first to view this page");
    inject(Router).navigate(['/auth/login'])
  }
  return authorized;
};
