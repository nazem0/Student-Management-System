import { Injectable } from '@angular/core';
import { StudentModule } from '../student.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api-response';
import { StudentInList } from '../models/student-in-list';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: StudentModule
})
export class StudentService {
  private readonly endpointParent = "Student"

constructor(private http:HttpClient) { }

getStudentsList():Observable<ApiResponse<StudentInList[]>>{
  return this.http.get<ApiResponse<StudentInList[]>>(`${environment}/${this.endpointParent}/Get`)
}

}
