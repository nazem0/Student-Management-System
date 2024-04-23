import { TranslateService } from '@ngx-translate/core';
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
  Mobile?: {
    countryCode?: string;
    dialCode?: string;
    e164Number?: string;
    internationalNumber?: string;
    nationalNumber?: string;
    number: string;
  }
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private translate:TranslateService
  ) {}
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
            if (AppHelper.onlyDigitsPattern.test(idParam)) {
              this.getStudentData(parseInt(idParam));
            }
            else {
              this.snackbar.open(this.translate.instant("Invalid_id"))
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
            this.snackbar.open(this.translate.instant("No_student_data_received"))
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
      NameArabic: new FormControl<string>(student.NameArabic, [Validators.required, Validators.maxLength(100)]),
      NameEnglish: new FormControl<string>(student.NameEnglish, [Validators.required, Validators.maxLength(100)]),
      FirstName: new FormControl<string>(student.FirstName, [Validators.required, Validators.maxLength(255)]),
      LastName: new FormControl<string>(student.LastName, [Validators.required, Validators.maxLength(255)]),
      Email: new FormControl<string | null>(student.Email,[Validators.email, Validators.maxLength(255)]),
      Mobile: new FormControl<string | null>(student.Mobile,[Validators.maxLength(255)]),
      NationalID: new FormControl<string | null>(student.NationalID,[Validators.maxLength(255)]),
      Age: new FormControl<number>(student.Age)
    });
    this.setMobileNumberValue(student.Mobile);
  }

  setMobileNumberValue(mobile: string) {
    this.Mobile = {
      number:mobile,
    }
  }
  editStudent() {
    // enforce not null because the function is called once
    // and in the case it was called it can't be null
    this.studentForm!.markAllAsTouched();
    if (this.studentForm!.invalid) {
      this.snackbar.open(this.translate.instant("Please_check_student_data"))
    }
    else {
      this.studentService
        .editStudent(this.studentForm!.value)
        .subscribe();
    }
  }
}
