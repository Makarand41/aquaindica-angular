// import { CanActivateFn } from '@angular/router';

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class AdminGuard {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/admin/login']);
    return false;
  }

}

// export const adminAuthGuard: CanActivateFn = () => {
//   return localStorage.getItem('adminLoggedIn') === 'true';
  
// };
// @Injectable({ providedIn: 'root' })
// export class AdminGuard {

//  canActivate(): boolean {
//   return !!localStorage.getItem('token');
// }

  
// }