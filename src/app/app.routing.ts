import { RouterModule, Routes } from '@angular/router';
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student/student.module').then((m) => m.StudentModule),
      canActivate:[userGuard]
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
