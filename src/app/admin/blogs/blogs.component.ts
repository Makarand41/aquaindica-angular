import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class AdminBlogsComponent implements OnInit {

  blogs: any[] = [];
  selectedFile!: File;

  blog = {
    title: '',
    content: '',
    author: ''
  };

  private API_URL = 'http://localhost:8080/api/admin/blogs';

  constructor(private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitBlog() {
    if (!this.selectedFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.blog.title);
    formData.append('content', this.blog.content);
    formData.append('author', this.blog.author);
    formData.append('coverImage', this.selectedFile);

    this.http.post(this.API_URL, formData).subscribe({
      next: () => {
        alert('Blog added successfully');
        this.resetForm();
        this.getAllBlogs();
      },
      error: (err) => {
        console.error(err);
        alert('Error while adding blog');
      }
    });
  }
  back() {
    this.location.back();  // ✅ goes to previous page
  }
  getAllBlogs() {
   this.http.get<any[]>(this.API_URL + '/getBlogs').subscribe(data => {
      this.blogs = data;
    });
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
        this.getAllBlogs();
      });
    }
  }

  resetForm() {
    this.blog = { title: '', content: '', author: '' };
    this.selectedFile = undefined as any;
  }
}
