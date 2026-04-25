import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewInit {

  slides = [
    {
      image: 'assets/images/home1.jpg',
      title: 'Water & Infrastructure Solutions',
      subtitle: 'Sustainable • Reliable • Innovative'
    },
    {
      image: 'assets/images/home2.jpg',
      title: 'Engineering Excellence',
      subtitle: 'Driven by technology and experience'
    },
    {
      image: 'assets/images/home3.jpg',
      title: 'End-to-End Services',
      subtitle: 'From design to maintenance'
    }
  ];

  currentSlide = 0;

  homeServices: any[] = [];

  @ViewChildren('serviceCard', { read: ElementRef }) serviceCards!: QueryList<ElementRef>;

  constructor(
    private title: Title,
    private meta: Meta,
    private http: HttpClient   // ✅ single constructor
  ) {}

  ngOnInit(): void {

    // SEO
    this.title.setTitle('Aquaindica Techno Solutions | Water & Infrastructure');
    this.meta.addTags([
      { name: 'description', content: 'Aquaindica Techno Solutions provides sustainable water and infrastructure engineering solutions.' },
      { name: 'keywords', content: 'Water Treatment, Wastewater Management, Pumping System Design, Smart Water Network, PLC SCADA, NanoBubble' },
      { name: 'author', content: 'Aquaindica Techno Solutions Pvt Ltd' }
    ]);

    // slider
    setInterval(() => this.nextSlide(), 5000);

    // ✅ load services from backend
    this.loadServices();
  }

  loadServices() {
    this.http.get<any[]>('http://localhost:8080/api/services')
      .subscribe(res => {
        this.homeServices = res;
      });
  }

  ngAfterViewInit(): void {
    if (this.serviceCards) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      this.serviceCards.forEach(card => observer.observe(card.nativeElement));
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}


// import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
// import { Meta, Title } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { SERVICES } from '../../data/services.data';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './home.html',
//   styleUrls: ['./home.css'],
// })
// export class Home implements OnInit, AfterViewInit {

//   slides = [
//     {
//       image: 'assets/images/home1.jpg',
//       title: 'Water & Infrastructure Solutions',
//       subtitle: 'Sustainable • Reliable • Innovative'
//     },
//     {
//       image: 'assets/images/home2.jpg',
//       title: 'Engineering Excellence',
//       subtitle: 'Driven by technology and experience'
//     },
//     {
//       image: 'assets/images/home3.jpg',
//       title: 'End-to-End Services',
//       subtitle: 'From design to maintenance'
//     }
//   ];

//   currentSlide = 0;

//   // 🔥 animation reference
//   @ViewChildren('serviceCard', { read: ElementRef }) serviceCards!: QueryList<ElementRef>;

//   constructor(private title: Title, private meta: Meta) {}

//   ngOnInit(): void {

//     // SEO
//     this.title.setTitle('Aquaindica Techno Solutions | Water & Infrastructure');
//     this.meta.addTags([
//       { name: 'description', content: 'Aquaindica Techno Solutions provides sustainable water and infrastructure engineering solutions.' },
//       { name: 'keywords', content: 'Water Treatment, Wastewater Management, Pumping System Design, Smart Water Network, PLC SCADA, NanoBubble' },
//       { name: 'author', content: 'Aquaindica Techno Solutions Pvt Ltd' }
//     ]);

//     // auto slider
//     setInterval(() => this.nextSlide(), 5000);
//   }

//   ngAfterViewInit(): void {
//     if (this.serviceCards) {
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('active');
//             observer.unobserve(entry.target);
//           }
//         });
//       }, { threshold: 0.2 });

//       this.serviceCards.forEach(card => observer.observe(card.nativeElement));
//     }
//   }

//   nextSlide() {
//     this.currentSlide = (this.currentSlide + 1) % this.slides.length;
//   }

//   prevSlide() {
//     this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
//   }

//   // // 🔥 services data
//   // homeServices = SERVICES;

//   homeServices: any[] = [];

// constructor(private http: HttpClient) {}

// ngOnInit() {
//   this.loadServices();
// }

// loadServices() {
//   this.http.get<any[]>('http://localhost:8080/api/services')
//     .subscribe(res => {
//       this.homeServices = res;
//     });
// }
// }



// // import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
// // import { Meta, Title } from '@angular/platform-browser';
// // import { DOCUMENT, CommonModule } from '@angular/common';
// // import { RouterModule } from '@angular/router';
// // import { SERVICES } from '../../data/services.data';

// // @Component({
// //   selector: 'app-home',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule],
// //   templateUrl: './home.html',
// //   styleUrls: ['./home.css'],
// // })
// // export class Home implements OnInit, AfterViewInit {

  
// //   slides = [
// //     {
// //       image: 'assets/images/home1.jpg',
// //       title: 'Water & Infrastructure Solutions',
// //       subtitle: 'Sustainable • Reliable • Innovative'
// //     },
// //     {
// //       image: 'assets/images/home2.jpg',
// //       title: 'Engineering Excellence',
// //       subtitle: 'Driven by technology and experience'
// //     },
// //     {
// //       image: 'assets/images/home3.jpg',
// //       title: 'End-to-End Services',
// //       subtitle: 'From design to maintenance'
// //     }
// //   ];

// //   currentSlide = 0;

// //   // ✅ Reference all service cards
// //   @ViewChildren('serviceCard', { read: ElementRef }) serviceCards!: QueryList<ElementRef>;

// //   constructor(private title: Title, private meta: Meta) {}

// //   ngOnInit(): void {
// //     this.title.setTitle('Aquaindica Techno Solutions | Water & Infrastructure');
// //     this.meta.addTags([
// //       { name: 'description', content: 'Aquaindica Techno Solutions provides sustainable water and infrastructure engineering solutions.' },
// //       { name: 'keywords', content: 'Water Treatment, Wastewater Management, Pumping System Design, Smart Water Network, PLC SCADA, NanoBubble,water technology,water technologies, Nano Bubble Technology, Aquaindica Techno Solutions Pune' },
// //       { name: 'author', content: 'Aquaindica Techno Solutions Pvt Ltd' }
// //     ]);
// //     this.meta.updateTag({
// //   name: 'keywords',
// //   content: `
// //   Customized, Reliable, Cost effective, Sustainable & Innovative Solutions,
// //   Water, Wastewater, Irrigation Infrastructure,
// //   Nano Bubble Technology, Ultrasound Technology,
// //   Non-Chemical Treatment of Water,NanoBubbleTechnology,
// //   Pumping System Design, Speciality Coatings,
// //   Water & Wastewater Treatment, Process Optimization,
// //   Testing & Commissioning of WTP, WSS,
// //   Operation & Maintenance,
// //   IoT, PLC-SCADA, Smart Pump Control,
// //   DMA Zoning, Advanced Leak Detection,
// //   NRW Management, Online Water Quality Monitoring,
// //   Packaged Treatment Plants, Booster Pumping Station,
// //   Solar Pumps, Lift Irrigation,
// //    sonochemical technology, sonochemical water treatment, sonochemical wastewater treatment, sonochemical advanced oxidation (AOP), sonochemical disinfection, sonochemical degradation, sonochemical processes, sonochemical applications, ad, sonochemical effects, sonochemical mechanisms, sonochemical efficiency, sonochemical energy, sonochemical cavitation, sonochemical bubble dynamics,Reacctive Oxygen Species (ROS), sonochemical reactors, sonochemical scale-up, sonochemical optimization, Rejunevation of Water Bodies, Sonochemical Treatment of Algae, Sonochemical Treatment of Emerging Contaminants, Sonochemical Treatment of Industrial Effluents, Sonochemical Treatment of Municipal Wastewater, Sonochemical Treatment of Drinking Water, Sonochemical Treatment of Groundwater, Sonochemical Treatment of Surface Water,cooling tower water treatement',
// //   Flood Monitoring System,

// // Disinfection of Water Treatment Plant, Sump, Reservoirs, CLF, Filter Beds

// // Nanobubble assisted oxidative disinfection of concrete surfaces of sump, reservoirs, CLF, filter beds

// // Flood Emergency Alarm System 
// // Booster Pumping Station 

// // Inline booster pumps with automatic control 

// // Direct pumping to distribution network,water body rejuvenation
// //   `
// // });


// //     setInterval(() => this.nextSlide(), 5000);
// //   }

// //   ngAfterViewInit(): void {
// //     // ✅ Only run if serviceCards exist
// //     if (this.serviceCards) {
// //       const observer = new IntersectionObserver((entries) => {
// //         entries.forEach(entry => {
// //           if (entry.isIntersecting) {
// //             entry.target.classList.add('active');
// //             observer.unobserve(entry.target); // animate once
// //           }
// //         });
// //       }, { threshold: 0.2 });

// //       this.serviceCards.forEach(card => observer.observe(card.nativeElement));
// //     }
// //   }

// //   nextSlide() {
// //     this.currentSlide = (this.currentSlide + 1) % this.slides.length;
// //   }

// //   prevSlide() {
// //     this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
// //   }

// //   homeServices = SERVICES;

// // //   homeServices = [
// // //   { title: 'Training & Development', icon: '🎓', slug: 'training' },
// // //   { title: 'Operation & Maintenance', icon: '⚙️', slug: 'operation' },
// // //   { title: 'Testing & Commissioning', icon: '🧪', slug: 'testing' },
// // //   { title: 'Third Party Inspections', icon: '📋', slug: 'inspection' },
// // //   { title: 'Advanced Leak Detection', icon: '💧', slug: 'leak' },
// // //   { title: 'Engineering Consultancy', icon: '🏗️', slug: 'consultancy' },
// // //   { title: 'Surge Vessels', icon: '🔄', slug: 'surge' },
// // //   { title: 'PLC, SCADA & IoT', icon: '📡', slug: 'automation' },
// // //   { title: 'Motor Control Centers', icon: '⚡', slug: 'mcc' },
// // //   { title: 'Smart Water Network', icon: '🌊', slug: 'smart-water' },
// // //   { title: 'Energy & Water Audit', icon: '📊', slug: 'audit' },
// // //   { title: 'Water Quality Management', icon: '🧴', slug: 'quality' },
// // //   { title: 'Chemical Optimization', icon: '🧪', slug: 'chemical' },
// // //   { title: 'Cleaning & Disinfection', icon: '🧼', slug: 'cleaning' },
// // //   { title: 'Booster Pumping Station', icon: '🚰', slug: 'booster' },
// // //   { title: 'Pumping System Design', icon: '🔧', slug: 'pumping' }
// // // ];
// // }
