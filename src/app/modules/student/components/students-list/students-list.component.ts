import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { StudentInList } from '../../models/student-in-list';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackbar: MatSnackBar
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
            this.snackbar.open("No students received", "close")
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
