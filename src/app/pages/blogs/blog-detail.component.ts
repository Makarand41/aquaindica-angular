import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {

  blog: any;
  apiUrl = 'http://localhost:8080/api/admin/blogs/getBlogs';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
     private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.blog = data.find(b => b.id == id);
       this.cd.detectChanges();
    });
  }
}
