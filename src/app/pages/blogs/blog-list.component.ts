import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {

  blogs: any[] = [];
  // apiUrl = 'http://localhost:8081/api/admin/blogs/getBlogs';
apiUrl = `${environment.apiUrl}/api/admin/blogs/getBlogs`;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.blogs = data;
    });
  }

  openBlog(id: number) {
    this.router.navigate(['/blogs', id]);
  }
}
