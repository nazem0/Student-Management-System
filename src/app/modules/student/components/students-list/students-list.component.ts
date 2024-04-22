import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { StudentInList } from '../../models/student-in-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateStudentComponent } from '../create-student/create-student.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnInit {
  students: StudentInList[] = []
  constructor(
    private StudentService: StudentService,
    private snackbar: MatSnackBar,
    private modalService : NgbModal

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
}
