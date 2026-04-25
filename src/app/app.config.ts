import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { provideHttpClient, withFetch, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './admin/guards/auth.interceptor';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './admin/guards/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([ (req, next) => {
        const token = localStorage.getItem('token');
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next(req);
      }])
    )
  ]
};

// export const appConfig: ApplicationConfig = {
//   // providers: [
//   //   provideBrowserGlobalErrorListeners(),
//   //   provideRouter(routes), 
//   //   provideHttpClient(),
//   //   provideClientHydration(withEventReplay()),
//   //     provideHttpClient(withFetch()) 
//   // ]

//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideRouter(routes, withHashLocation()),
//     provideHttpClient(withFetch()),
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
//   ]
// };
