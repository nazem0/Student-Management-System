import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input-gg";
import { SharedModule } from "../shared/shared.module";
import { CreateStudentComponent } from "./components/create-student/create-student.component";
import { StudentsListComponent } from "./components/students-list/students-list.component";
import { StudentService } from "./services/student.service";
import { StudentRoutes } from "./student.routing";




@NgModule({
  declarations: [
    StudentsListComponent,
    CreateStudentComponent
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
