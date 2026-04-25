import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactAdminService {
  //private API_URL = 'http://localhost:8081/api/contact';
  private API_URL = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/all`);
  }
}
