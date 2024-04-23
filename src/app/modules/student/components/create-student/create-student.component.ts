import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input-gg';
import { AppHelper } from '../../../../helpers/app-helper';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent {
  @Input() name: string = "modalInstance";
  // @Output() studentCreationEvent = new EventEmitter()
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
    public activeModal : NgbActiveModal,
    private formBuilder: FormBuilder,
    private studentService:StudentService,
    ) {
    this.initForm();
  }
  initForm(){
    this.studentForm = this.formBuilder.group({
      FirstName: new FormControl<string>('', [Validators.required, Validators.maxLength(255)]),
      LastName: new FormControl<string>('', [Validators.required, Validators.maxLength(255)]),
      Email: new FormControl<string>('', [Validators.email, Validators.maxLength(255)]),
      Mobile:new FormControl<string>('',[Validators.maxLength(255)]),
      NationalID: new FormControl<string>('',[Validators.maxLength(255)]),
      Age: new FormControl<number | undefined>(undefined,[Validators.required])
    });
  }
  createStudent(){
    console.log(this.studentForm);
    
    this.studentForm.markAllAsTouched();
    if(this.studentForm.valid){
      this.studentService
      .createStudent(this.studentForm.value)
      .subscribe({
        next:()=>this.activeModal.close(true),
        error:()=>this.activeModal.dismiss()
      });
    }
  }
}
