import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //private apiUrl = 'http://localhost:8081/api/contact';
private apiUrl = `${environment.apiUrl}/api/contact`;
  constructor(private http: HttpClient) {}

  submitContact(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
