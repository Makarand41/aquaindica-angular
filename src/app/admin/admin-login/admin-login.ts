import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css'],
})
export class AdminLogin {
  username = '';
  password = '';
  otp = '';
  otpVerified = false;
  loading = false;
  errorMessage = '';
  infoMessage = '';

  constructor(private authService: AdminAuthService, private router: Router) {}



  sendOtp() {

  localStorage.removeItem('token'); // clear old expired token

  if (!this.username || !this.password) {
    alert('Enter username and password');
    return;
  }

  this.authService.login({ username: this.username, password: this.password })
    .subscribe({
      next: (res: any) => {
      alert(res.message); 
    },
      error: (err) => alert(err?.error || 'Failed to send OTP')
    });
}

verifyOtp() {
  if (!this.otp) {
    alert('Please enter OTP');
    return;
  }

  if (!this.username) {
    alert('Username missing. Please resend OTP.');
    return;
  }

  this.authService.verifyOtp({
    username: this.username,   // ✅ DIRECTLY from ngModel
    otp: this.otp
  }).subscribe({
    next: (res: any) => {
      this.otpVerified = true;
      localStorage.setItem('token', res.token); // store JWT here
      alert('OTP verified successfully!');
    },
    error: (err: any) => {
      alert(err?.error || 'Invalid OTP');
    }
  });
}

  
finalLogin() {
  if (!this.otpVerified) {
    alert('Please verify OTP first');
    return;
  }

  alert('Login successful!');
  this.router.navigate(['/admin/dashboard']);
}




  resendOtp() {
    if (!this.username) return;

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => alert('OTP has been resent to your registered email/phone.'),
        error: (err: any) => this.errorMessage = err?.error || 'Unable to resend OTP'
      });
  }
}



