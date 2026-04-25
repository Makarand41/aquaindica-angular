import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GalleryService {

  //private api = 'http://localhost:8081/api';
  private api = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  upload(title: string, file: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);   // ✅ MUST be "file"

    return this.http.post(`${this.api}/admin/gallery`, formData);
  }

  getAll() {
    return this.http.get<any[]>(`${this.api}/gallery`);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.api}/gallery/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/admin/gallery/${id}`);
  }
}