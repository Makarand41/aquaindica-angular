import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactAdminService {
  private API_URL = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/all`);
  }
}
