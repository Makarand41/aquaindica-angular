import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('token');

    let headers = req.headers.set('ngrok-skip-browser-warning', 'true');

    if (token && 
        !req.url.includes('/api/admin/login') &&
        !req.url.includes('/api/admin/verify-otp')) {

      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    req = req.clone({ headers });

    return next.handle(req);
  }
}