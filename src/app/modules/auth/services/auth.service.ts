import { Injectable } from '@angular/core';
import { AuthModule } from '../auth.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: AuthModule
})
export class AuthService {

constructor(
  private http: HttpClient,
) { }

}
