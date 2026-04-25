import { CommonModule } from '@angular/common';
import { Component,HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

   isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu() {
  this.isMenuOpen = false;
}
@HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}

