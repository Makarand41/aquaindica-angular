import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {

  // private API_URL = 'http://localhost:8081/api/admin';

private API_URL = `${environment.apiUrl}/api/admin`;
  constructor(private http: HttpClient) {}

  // ✅ STEP 1: LOGIN
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  // ✅ STEP 2: VERIFY OTP
  verifyOtp(data: { username: string; otp: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/verify-otp`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
