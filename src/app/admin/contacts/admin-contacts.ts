import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { interval, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-contacts.html',
  styleUrls: ['./admin-contacts.css']
})

export class  AdminContacts {
  contacts: any[] = [];
  selectedEmail: string = '';
  selectedName: string = '';
  replyMessage: string = '';
  ccEmail: string = '';
  isArchiveView: boolean = false;
  autoRefreshSub!: Subscription;
  

loading = true;
  constructor(private http: HttpClient) {}

 ngOnInit() {
  this.loadContacts();
  this.startAutoRefresh();

  // Auto refresh every 10 seconds (10000 ms)
  this.autoRefreshSub = interval(10000).subscribe(() => {
    if (this.isArchiveView) {
      this.loadArchived();
    } else {
      this.loadContacts();
    }
  });
}

  loadContacts() {
    this.loading = true;
    this.isArchiveView = false;
    //this.http.get<any[]>('http://localhost:8081/api/contact/all')
    this.http.get<any[]>(`${environment.apiUrl}/api/contact/all`)
      .subscribe({
        next: (res) => {
          console.log('Contacts from API:', res);
          this.contacts = res;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error('API error:', err);
        }
      });
  }
sendReply() {
  const body = {
    email: this.selectedEmail,
    username: this.selectedName,
    message: this.replyMessage,
     cc: this.ccEmail 
  };

  //this.http.post('http://localhost:8081/api/admin/reply', body)
  this.http.post(`${environment.apiUrl}/api/admin/reply`, body)
    .subscribe({
      next: () => {
        alert("Email sent successfully");
        this.ccEmail = '';
      },
      error: (err) => {
        console.error(err);
      }
    });
}
deleteContact(id: number) {
  if (confirm('Are you sure you want to delete this contact?')) {
    //this.http.delete(`http://localhost:8081/api/admin/delete/${id}`, {
this.http.delete(`${environment.apiUrl}/api/admin/delete/${id}`, {
      responseType: 'text'
    }).subscribe({
      next: (res) => {
        alert(res);
        this.loadContacts() // refresh list
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
stopAutoRefresh() {
  if (this.autoRefreshSub) {
    this.autoRefreshSub.unsubscribe();
  }
}
archiveContact(id: number) {
  if (confirm('Archive this contact?')) {

    this.stopAutoRefresh(); // 🛑 stop refresh

   // this.http.put(`http://localhost:8081/api/contact/archive/${id}`, {})
   this.http.put(`${environment.apiUrl}/api/contact/archive/${id}`, {})
      .subscribe({
        next: () => {
          alert("Contact archived successfully");

          this.loadContacts(); // reload fresh data
          this.startAutoRefresh(); // ▶️ restart refresh
        },
        error: (err) => {
          console.error(err);
          this.startAutoRefresh();
        }
      });
  }
}
startAutoRefresh() {
  this.autoRefreshSub = interval(10000).subscribe(() => {
    if (this.isArchiveView) {
      this.loadArchived();
    } else {
      this.loadContacts();
    }
  });
}
// archiveContact(id: number) {
//   if (confirm('Archive this contact?')) {
//     this.http.put(`http://localhost:8081/api/contact/archive/${id}`, {})
//       .subscribe({
//         next: () => {
//           // Remove archived contact from current list instantly
//           this.contacts = this.contacts.filter(c => c.id !== id);
//           alert("Contact archived successfully");
//         },
//         error: (err) => {
//           console.error(err);
//         }
//       });
//   }
// }

unarchiveContact(id: number) {
  if (confirm('Restore this contact?')) {
      this.stopAutoRefresh();
       this.loadContacts(); // reload fresh data
          this.startAutoRefresh(); // ▶️ restart refresh
    // this.http.put(`http://localhost:8081/api/contact/unarchive/${id}`, {})
    this.http.put(`${environment.apiUrl}/api/contact/unarchive/${id}`, {})
      .subscribe({
        next: () => {
          alert("Contact restored successfully");
          

          if (this.isArchiveView) {
            this.loadArchived();
          } else {
            this.loadContacts();
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
// unarchiveContact(id: number) {
//   if (confirm('Restore this contact?')) {
//     this.http.put(`http://localhost:8081/api/contact/unarchive/${id}`, {})
//       .subscribe({
//         next: () => {
//           this.contacts = this.contacts.filter(c => c.id !== id);
//           alert("Contact restored successfully");
//         },
//         error: (err) => {
//           console.error(err);
//         }
//       });
//   }
// }
loadArchived() {
  this.loading = true;
   this.isArchiveView = true;
  //this.http.get<any[]>('http://localhost:8081/api/contact/archived')
  this.http.get<any[]>(`${environment.apiUrl}/api/contact/archived`)
    .subscribe({
      next: (res) => {
        this.contacts = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
}


downloadExcel() {

  const formattedData = this.contacts.map(c => ({
    Name: c.firstName + ' ' + c.lastName,
    Email: c.email,
    Phone: c.phone,
    Subject: c.subject,
    Message: c.message,
    Date: c.createdAt
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Contacts': worksheet },
    SheetNames: ['Contacts']
  };

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data: Blob = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  });

  saveAs(data, 'Contact_List.xlsx');
}


}
