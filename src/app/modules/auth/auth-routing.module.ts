import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
