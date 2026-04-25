import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([(req, next) => {
        const token = localStorage.getItem('token');

        let headers = req.headers.set('ngrok-skip-browser-warning', 'true');

        if (token &&
            !req.url.includes('/api/admin/login') &&
            !req.url.includes('/api/admin/verify-otp')) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }

        req = req.clone({ headers });
        return next(req);
      }])
    )
  ]
};