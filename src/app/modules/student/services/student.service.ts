import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "../../../../environments/environment"
import { ApiResponse } from "../../../models/api-response"
import { CreateStudentEndpointRequest } from "../models/create-student-endpoint-request"
import { EditStudentEndpointRequest } from "../models/edit-student-endpoint-request"
import { StudentDetails } from "../models/student-details"
import { StudentInList } from "../models/student-in-list"
import { StudentModule } from "../student.module"

@Injectable({
  providedIn: StudentModule
})
export class StudentService {
  private readonly endpointParent = "Student"

  constructor(private http: HttpClient) { }

  getStudentsList(): Observable<ApiResponse<StudentInList[]>> {
    return this.http.get<ApiResponse<StudentInList[]>>(`${environment.api}/${this.endpointParent}/Get`)
  }

  getStudentById(id: number): Observable<ApiResponse<StudentDetails>> {
    // Had to use GetEditableByID
    // The endpoint in the task should've been /GetById
    // But GetById doesn't provide ArName & EnName
    return this.http.get<ApiResponse<StudentDetails>>(`${environment.api}/${this.endpointParent}/GetEditableByID`, {
      params: {
        id: id
      }
    })
  }

  editStudent(student: EditStudentEndpointRequest): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${environment.api}/${this.endpointParent}/PUT`, student)
  }

  deleteStudent(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${environment.api}/${this.endpointParent}/Delete`, {
      params: {
        id: id
      }
    })
  }
  createStudent(student: CreateStudentEndpointRequest): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${environment.api}/${this.endpointParent}/POST`, student)
  }
}
