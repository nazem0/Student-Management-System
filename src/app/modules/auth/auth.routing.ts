import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:"", component: LayoutComponent, children:[
      {
        path:"register", component:RegisterComponent, title:"Register"
      },
      {
        path:"login", component:LoginComponent, title:"Login"
      }
    ]
  }
];

export const AuthRoutes = RouterModule.forChild(routes);
