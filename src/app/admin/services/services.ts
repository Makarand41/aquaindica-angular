import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class ServicesComponent {
 environment = environment; 
  //baseUrl = 'http://localhost:8081/api/admin';
  baseUrl = `${environment.apiUrl}/api/admin`;

  service = { title: '', description: '' };
  topic = { title: '' };
  detail = { description: '', imageUrl: '' };

  selectedServiceId: any;
  selectedTopicId: any;

  constructor(private http: HttpClient) {}

  // ✅ ADD SERVICE
  addService() {
    this.http.post(`${this.baseUrl}/service`, this.service, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(() => {
      alert('Service Added');
       this.loadServices();
    });
  }

  services: any[] = [];
allTopics: any[] = [];
  // ✅ ADD TOPIC
  // addTopic() {
  //   this.http.post(`${this.baseUrl}/topic/${this.selectedServiceId}`, this.topic, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).subscribe(() => {
  //     alert('Topic Added');
  //   });
  // }
selectedService: any = null;
filteredTopics: any[] = [];

onServiceChange() {
  this.selectedService = this.services.find(
    s => s.id == this.selectedServiceId
  );

  this.filteredTopics = this.selectedService?.topics || [];
}
  addTopic() {
  console.log("Service ID:", this.selectedServiceId);

  this.http.post(`${this.baseUrl}/topic/${this.selectedServiceId}`, this.topic, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).subscribe(() => {
    alert('Topic Added');
     this.loadServices();
  });
}
  // ✅ ADD DETAIL
  // addDetail() {
  //   this.http.post(`${this.baseUrl}/detail/${this.selectedTopicId}`, this.detail, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).subscribe(() => {
  //     alert('Detail Added');
  //   });
  // }

  selectedFile: any;

// file select
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

// upload detail
addDetail() {
  const formData = new FormData();

  formData.append('description', this.detail.description);
  formData.append('image', this.selectedFile);

  this.http.post(`${this.baseUrl}/detail/${this.selectedTopicId}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
      // ❌ DON'T ADD Content-Type
    }
  }).subscribe(() => {
    alert('Detail Added');
    this.loadServices();
  });
}
deleteService(id: number) {
  if (!confirm('Delete this service?')) return;
  this.http.delete(`${this.baseUrl}/service/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).subscribe(() => {
    alert('Service Deleted');
    this.loadServices();
  });
}

deleteTopic(id: number) {
  if (!confirm('Delete this service?')) return;
  this.http.delete(`${this.baseUrl}/topic/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).subscribe(() => {
    alert('Topic Deleted');
    this.loadServices();
  });
}

deleteDetail(id: number) {
  if (!confirm('Delete this service?')) return;
  this.http.delete(`${this.baseUrl}/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).subscribe(() => {
    alert('Detail Deleted');
    this.loadServices();
  });
}




ngOnInit() {
  this.loadServices();
}

loadServices() {
  // this.http.get<any[]>('http://localhost:8081/api/services')
  this.http.get<any[]>(`${environment.apiUrl}/api/services`)
    .subscribe(res => {
      this.services = res;

      this.allTopics = [];
      res.forEach(s => {
        if (s.topics) {
          this.allTopics.push(...s.topics);
        }
      });
    });
}
}

