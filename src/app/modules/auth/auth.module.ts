import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutes } from './auth.routing';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutes,
    ReactiveFormsModule,
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
