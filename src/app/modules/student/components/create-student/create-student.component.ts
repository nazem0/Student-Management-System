import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input-gg';
import { AppHelper } from '../../../../helpers/app-helper';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent {
  studentForm!: FormGroup;
  countryISO = CountryISO;
  appHelper=AppHelper;
  Mobile? : {
    countryCode: string;
    dialCode: string;
    e164Number: string;
    internationalNumber: string;
    nationalNumber: string;
    number: string;
  };
  constructor(
    private formBuilder: FormBuilder,
    private studentService:StudentService,
    private snackbar:MatSnackBar
    ) {
    this.initForm();
  }
  initForm(){
    this.studentForm = this.formBuilder.group({
      FirstName: new FormControl<string>('', [Validators.required]),
      LastName: new FormControl<string>('', [Validators.required]),
      Email: new FormControl<string>('', [Validators.required, Validators.email]),
      Mobile:new FormControl<string>('',[Validators.required]),
      NationalID: new FormControl<string>('', [Validators.required]),
      Age: new FormControl<number | undefined>(undefined, [Validators.required])
    });
  }
  createStudent(){
    if(this.studentForm.invalid){
      this.snackbar.open("Please check student data", "close")
    }
    else{
      this.studentForm.markAllAsTouched();
      this.studentService
      .createStudent(this.studentForm.value)
      .subscribe();
    }
  }
}
