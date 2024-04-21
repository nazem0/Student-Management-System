import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"", component: LayoutComponent, children:[
      {
        path:"register", component:RegisterComponent, title:"Register"
      }
    ]
  }
];

export const AuthRoutes = RouterModule.forChild(routes);
