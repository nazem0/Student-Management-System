import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { StudentInList } from '../../models/student-in-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteStudentConfirmationComponent } from './delete-student-confirmation/delete-student-confirmation.component';
import { CreateStudentComponent } from '../create-student/create-student.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnInit {
  students: StudentInList[] = []
  studentsCopy: StudentInList[] = []
  filters: {
    Name: string,
    Mobile: string,
    NationalID: string,
    Email: string,
    Age?: number
  };
  constructor(
    private StudentService: StudentService,
    private snackbar: MatSnackBar,
    private modalService : NgbModal,
    private translate:TranslateService
  ) {
    this.filters = {
      Name: "",
      Mobile: "",
      NationalID: "",
      Email: ""
    }
  }
  ngOnInit(): void {
    this.getStudentsList();
  }
  getStudentsList() {
    this.StudentService
      .getStudentsList()
      .subscribe({
        next: next => {
          if (!next.Data) {
            this.snackbar.open(this.translate.instant("No_students_data_received"))
          }
          else {
            this.students = next.Data
            /*
            Value Copy
            because referencing the same pointer
            would affect both lists in the filter function
            and we only want one of them filtered
            and the other stays the same
            */
            this.studentsCopy = JSON.parse(JSON.stringify(next.Data))
          }
        }
      })
  }
  openDeleteStudentConfirmation(studentId: number){
    const modalRef = this.modalService.open(DeleteStudentConfirmationComponent);
		modalRef.componentInstance.name = `deleteStudent${new Date().getTime()}`;
    modalRef.result.then((value:boolean)=>{
      if(value)
      {
        this.deleteStudent(studentId)
      }
    })

  }
  deleteStudent(studentId: number) {
    this.StudentService
      .deleteStudent(studentId)
      .subscribe({
        next: () => {
          this.getStudentsList()
        }
      })
    }

  openCreateStudentModal(){
    const modalRef = this.modalService.open(CreateStudentComponent);
		modalRef.componentInstance.name = `createStudent${new Date().getTime()}`;
    modalRef.result.then((value:boolean)=>{
      if(value)
      {
        this.getStudentsList()
      }
    })
  }
  filterStudents() {
    this.students = this.studentsCopy
    this.students =
      this.students.filter(e => e.Name.includes(this.filters.Name))

    this.students =
      this.students.filter(e => e.Mobile.includes(this.filters.Mobile))
    /* 
    Commented because not mentioned in the task,
     but I can implement it anyway 
    */

    // this.students = 
    // this.students.filter(e => e.Email.includes(this.filters.Email))

    this.students =
      this.students
        .filter(e => e.NationalID.includes(this.filters.NationalID))

    if (typeof this.filters.Age === "number") {
      this.students = this.students.filter(e => e.Age == this.filters.Age)
    }
  }
}
