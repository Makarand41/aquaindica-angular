import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  private baseUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) {}

  getAllServices() {
    return this.http.get<any[]>(this.baseUrl);
  }
}