import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


;

// 🔥 Apply saved theme BEFORE Angular renders
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
