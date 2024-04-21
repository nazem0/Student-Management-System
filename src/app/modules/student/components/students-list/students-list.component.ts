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
  constructor(
    private StudentService: StudentService,
    private snackbar: MatSnackBar
  ) { }
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
          }
        }
      })
  }
}
