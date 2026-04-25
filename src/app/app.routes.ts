import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { ServicesComponent } from './pages/services/services';
import { Gallery } from './pages/gallery/gallery';
import { Association } from './pages/association/association';
import { Contact } from './pages/contact/contact';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { AdminLogin } from './admin/admin-login/admin-login';
import { AdminGuard } from './admin/guards/admin-auth.guard';
import { AdminContacts } from './admin/contacts/admin-contacts';
import { AdminBlogsComponent } from './admin/blogs/blogs.component';



export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'services', component: ServicesComponent },
  { path: 'gallery', component: Gallery },
 // { path: 'blogs', component: Blogs },
  { path: 'association', component: Association },
  { path: 'contact', component: Contact },
{ path: 'admin/login', component: AdminLogin },
 { path: 'admin/dashboard', component: AdminDashboard, canActivate: [AdminGuard] },


// {
//   path: 'admin/dashboard',
//   component: AdminDashboard,
//   canActivate: [AdminGuard]
// },

{ path: 'admin/contacts', component: AdminContacts, canActivate: [AdminGuard] },
 { path: 'admin/blogs', component: AdminBlogsComponent, canActivate: [AdminGuard] }

 ,{
  path: 'blogs',
  loadComponent: () =>
    import('./pages/blogs/blog-list.component').then(m => m.BlogListComponent),
}
,
{
  path: 'blogs/:id',
  loadComponent: () =>
    import('./pages/blogs/blog-detail.component').then(m => m.BlogDetailComponent),
},

{
  path: 'admin/gallery',
  loadComponent: () =>
    import('./admin/gallery/admin-gallery.component')
      .then(m => m.AdminGalleryComponent),
  canActivate: [AdminGuard]
},{
  path: 'admin/services',
  loadComponent: () => import('./admin/services/services').then(m => m.ServicesComponent),
  canActivate: [AdminGuard]
}
,
  //{ path: '**', redirectTo: '' }
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { useHash: true }) // 👈 important
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
