import { Component } from '@angular/core';
import { AppHelper } from '../../../../helpers/app-helper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { AuthHelper } from '../../../../helpers/auth-helper';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  appHelper = AppHelper;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private authHelper: AuthHelper,
    private router:Router,
    private translate:TranslateService
  ) {
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
      this.snackbar.open(this.translate.instant("Please_check_your_login_data"))
    }
    else {
      this.authService.login(this.loginForm.value).subscribe({
        next: next => {
          if (!next.Data) {
            this.snackbar.open(this.translate.instant("No_token_received"))
          }
          else {
            this.snackbar.open(this.translate.instant("Authenticated"))
            this.authHelper.storeToken(next.Data)
            this.router.navigate(['/'])
          }
        }
      })
    }
  }
}
