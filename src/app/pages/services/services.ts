import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {

  services: any[] = [];
  selectedService: any = null;
  selectedTopic: any = null;

  // 🔥 Loader
  isLoading: boolean = true;

  // 🔥 Image Modal
  selectedImage: string | null = null;

  constructor(private http: HttpClient) {}

  

  ngOnInit() {
    this.loadServices();
  }

  // ✅ FAST LOAD (no multiple API calls)
  loadServices() {
    this.isLoading = true;

    this.http.get<any[]>('http://localhost:8080/api/services')
      .subscribe({
        next: (res) => {
          this.services = res;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading services:', err);
          this.isLoading = false;
        }
      });
  }

  // ✅ Open service overlay
  openService(service: any) {
    this.selectedService = service;
    document.body.style.overflow = 'hidden';
  }

  // ✅ Close overlay
  closeService() {
    this.selectedService = null;
    this.selectedTopic = null;
    document.body.style.overflow = 'auto';
  }

  // ✅ Topic select
  selectTopic(topic: any) {
    this.selectedTopic = topic;
  }

  // ✅ Image Modal
  openImageModal(img: string) {
    this.selectedImage = img;
  }

  closeImageModal() {
    this.selectedImage = null;
  }

  // Optional toggle (if needed)
  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}



// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { SERVICES } from '../../data/services.data';
// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-services',
//  imports: [CommonModule, RouterModule],
//   templateUrl: './services.html',
//   styleUrl: './services.css',
// })
// export class ServicesComponent {

// //   constructor(private route: ActivatedRoute) {}
// // services = SERVICES;

// // ngOnInit() {
// //   this.route.queryParams.subscribe(params => {
// //     const selectedService = params['service'];
// //     if (selectedService) {
// //       const index = this.services.findIndex(s =>
// //         s.title.toLowerCase().includes(selectedService)
// //       );
// //       if (index !== -1) {
// //         this.openIndex = index;
// //       }
// //     }
// //   });
// // }

// services: any[] = [];

// constructor(private http: HttpClient) {}
// selectedTopic: any = null;

// selectTopic(topic: any) {
//   this.selectedTopic = topic;
// }
// ngOnInit() {
//   this.loadServices();
// }


// getImage(id: number) {
//   return this.http.get(
//     `http://localhost:8080/api/admin/detail/image/${id}`,
//     { responseType: 'blob' }
//   );
// }

// // loadServices() {
// //   this.http.get<any[]>('http://localhost:8080/api/services')
// //     .subscribe(res => {
// //       this.services = res;
// //     });
// // }

// loadServices() {
//   this.http.get<any[]>('http://localhost:8080/api/services')
//     .subscribe(res => {
//       this.services = res;

//       this.services.forEach(s => {
//         s.topics?.forEach((t: any) => {
//           t.details?.forEach((d: any) => {

//             this.getImage(d.id).subscribe(blob => {
//               d.imageObject = URL.createObjectURL(blob);
//             });

//           });
//         });
//       });
//     });
// }
// selectedService: any = null;

// openService(service: any) {
//   this.selectedService = service;
//   document.body.style.overflow = 'hidden'; // prevent background scroll
// }

// closeService() {
//   this.selectedService = null;
//   document.body.style.overflow = 'auto';
// }
// selectedImage: string | null = null;

// openImageModal(img: string) {
//   this.selectedImage = img;
// }

// closeImageModal() {
//   this.selectedImage = null;
// }


//   // Track which card is open
//   openIndex: number | null = null;

//   toggle(index: number) {
//     this.openIndex = this.openIndex === index ? null : index;
//   }
// }