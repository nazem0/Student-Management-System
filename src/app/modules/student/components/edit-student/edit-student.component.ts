import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input-gg';
import { AppHelper } from '../../../../helpers/app-helper';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { StudentDetails } from '../../models/student-details';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit {
  studentForm?: FormGroup;
  countryISO = CountryISO;
  appHelper = AppHelper;
  Mobile: {
    countryCode: string;
    dialCode: string;
    e164Number: string;
    internationalNumber: string;
    nationalNumber: string;
    number: string;
  };
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {

    this.Mobile = {
      countryCode: "",
      dialCode: "",
      e164Number: "",
      internationalNumber: "",
      nationalNumber: "",
      number: ""
    }
  }
  ngOnInit(): void {
    this.initStudentId();
  }

  initStudentId() {
    this.route
      .paramMap
      .subscribe({
        next: next => {
          let idParam = next.get("id");
          if (idParam) {
            let id = parseInt(idParam);
            if (isFinite(id)) {
              console.log(id);

              this.getStudentData(id);
            }
            else {
              this.snackbar.open("Invalid student id", "close")
            }
          }
        }
      })
  }

  getStudentData(studentId: number) {
    this.studentService
      .getStudentById(studentId)
      .subscribe({
        next: next => {
          if (!next.Data) {
            this.snackbar.open("No student data received", "close")
          }
          else {
            this.initForm(next.Data);
          }
        }
      })
  }

  initForm(student: StudentDetails) {
    // On testing I found out only name fields are required..
    // Note !!! NameArabic & NameEnglish never change value
    // Api issue because it's Tested on Here / Swagger / PostMan 
    this.studentForm = this.formBuilder.group({
      ID: new FormControl<number>(student.ID, [Validators.required]),
      NameArabic: new FormControl<string>(student.NameArabic, [Validators.required]),
      NameEnglish: new FormControl<string>(student.NameEnglish, [Validators.required]),
      FirstName: new FormControl<string>(student.FirstName, [Validators.required]),
      LastName: new FormControl<string>(student.LastName, [Validators.required]),
      Email: new FormControl<string | null>(student.Email),
      Mobile: new FormControl<string | null>(student.Mobile),
      NationalID: new FormControl<string | null>(student.NationalID),
      Age: new FormControl<number>(student.Age)
    });
  }

  setMobileNumberValue(mobile: string) {
    this.Mobile.e164Number = mobile;
  }
  createStudent() {
    // enforce not null because the function is called once
    // and in the case it was called it can't be null
    this.studentForm!.markAllAsTouched();
    if (this.studentForm!.invalid) {
      this.snackbar.open("Please check student data", "close")
    }
    else {
      this.studentService
        .editStudent(this.studentForm!.value)
        .subscribe();
    }
  }
}
