import {
  Component,
  signal,
  HostListener,
  Inject,
  Renderer2
} from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/navbar/navbar';
import { Footer } from './core/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('aquaindica');

  showButton = false;
  isDark = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /* Scroll-to-top button */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* 🌙 Dark mode toggle */
  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this.renderer.addClass(this.document.body, 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
  }
}
