import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHelper } from '../helpers/auth-helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

export const userGuard: CanActivateFn = (route, state) => {
  let authorized = inject(AuthHelper).checkHasToken();
  if(!authorized){
    let translate = inject(TranslateService)
    inject(MatSnackBar).open(translate.instant("You_have_to_login_first_to_view_this_page"));
    inject(Router).navigate(['/auth/login'])
  }
  return authorized;
};
