import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  // private baseUrl = 'http://localhost:8081/api/services';
private baseUrl = `${environment.apiUrl}/api/services`;
  constructor(private http: HttpClient) {}

  getAllServices() {
    return this.http.get<any[]>(this.baseUrl);
  }
}