import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AppHelper } from '../../../../helpers/app-helper';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  appHelper = AppHelper;
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router:Router
  ) {
    this.createForm();
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      Name: new FormControl<string>('', [Validators.required]),
      UserName: new FormControl<string>('', [Validators.required]),
      Password: new FormControl<string>('', [Validators.required]),
    });
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.snackbar.open("Please check your registration data", "close")
    }
    else {
      this.authService.register(this.registerForm.value).subscribe({
        next:()=>this.router.navigate(['/auth/login'])
      })
    }
  }

}
