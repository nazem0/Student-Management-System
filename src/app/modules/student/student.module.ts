import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutes } from './student.routing';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentService } from './services/student.service';
import { SharedModule } from '../shared/shared.module';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteStudentConfirmationComponent } from './components/students-list/delete-student-confirmation/delete-student-confirmation.component';



@NgModule({
  declarations: [
    StudentsListComponent,
    EditStudentComponent,
    DeleteStudentConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutes,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule
  ],
  providers:[
    StudentService
  ]
})
export class StudentModule { }
