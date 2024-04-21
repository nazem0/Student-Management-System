import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registerForm!: FormGroup;
constructor(
  private formBuilder:FormBuilder
)
{
  this.createForm();
}
createForm() {
  this.registerForm = this.formBuilder.group({
    Name: new FormControl<string>('', [Validators.required]),
    UserName: new FormControl<string>('', [Validators.required]),
    Password: ['', [Validators.required]]
  });
}

onSubmit() {
  if (this.registerForm.valid) {
    console.log('Form Submitted', this.registerForm.value);
  } else {
    console.log('Form is not valid');
  }
}

}
