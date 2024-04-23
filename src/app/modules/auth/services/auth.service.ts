import { ApiResponse } from './../../../models/api-response';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterEndpointRequest } from '../models/register-endpoint-request';
import { LoginEndpointRequest } from '../models/login-endpoint-request copy';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly endpointParent = "User"
constructor(
  private http: HttpClient,
) { }
  register(data:RegisterEndpointRequest):Observable<ApiResponse<string>>{
    return this.http.post<ApiResponse<string>>(`${environment.api}/${this.endpointParent}/POST`, data)
  }

  login(data:LoginEndpointRequest):Observable<ApiResponse<string>>{
    return this.http.post<ApiResponse<string>>(`${environment.api}/${this.endpointParent}/Login`, data)
  }

  logout():Observable<ApiResponse<boolean>>{
    return this.http.post<ApiResponse<boolean>>(`${environment.api}/${this.endpointParent}/Logout`,{})
  }
}
