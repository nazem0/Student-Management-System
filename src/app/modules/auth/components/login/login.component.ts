import { Component } from '@angular/core';
import { AppHelper } from '../../../../helpers/app-helper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { AuthHelper } from '../../../../helpers/auth-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  appHelper=AppHelper;
  loginForm!:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private snackbar:MatSnackBar,
    private authService:AuthService,
    private authHelper:AuthHelper
    ){
      this.createForm();
    }
  createForm() {
    this.loginForm = this.formBuilder.group({
      UserName: new FormControl<string>('', [Validators.required]),
      Password: new FormControl<string>('', [Validators.required]),
    });
  }
  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.snackbar.open("Please check your login data", "close")
    }
    else {
      this.authService.login(this.loginForm.value).subscribe({
        next:next=>{
          if(!next.Data)
          {
            this.snackbar.open("No token received","close")
          }
          else{
            this.snackbar.open("Authenticated","✔")
            this.authHelper.storeToken(next.Data)
          }
        }
      })
    }
  }
}
