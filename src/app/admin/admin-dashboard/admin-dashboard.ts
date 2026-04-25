import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard {
  constructor(private router: Router,  private location: Location) {}
  back() {
    this.location.back();  // ✅ goes to previous page
  }
  logout() {
  localStorage.clear();   // clears everything
  this.router.navigate(['/admin/login']);
}

//   logout() {
//   localStorage.removeItem('token');   // ✅ remove JWT
//   localStorage.removeItem('adminUser'); // optional
//   this.router.navigate(['/admin/login']);
// }
}