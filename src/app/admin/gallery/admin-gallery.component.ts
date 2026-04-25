import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../services/GalleryService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {

  title = '';
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFileType: string = '';
  galleryList: any[] = [];

  constructor(private galleryService: GalleryService, private location: Location) {}

  ngOnInit() {
    this.loadGallery();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    // Detect type
    if (file.type.startsWith('video')) {
      this.selectedFileType = 'video';
    } else {
      this.selectedFileType = 'image';
    }

    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }

  uploadImage() {
    if (!this.title || !this.selectedFile) {
      alert('Title and File are required');
      return;
    }

    this.galleryService.upload(this.title, this.selectedFile)
      .subscribe(() => {
        alert('Uploaded successfully');
        this.reset();
        this.loadGallery();
      });
  }

  loadGallery() {
    this.galleryService.getAll().subscribe(data => {

      this.galleryList = data.map(item => {

        const mimeType = item.type === 'video'
          ? 'video/mp4'
          : 'image/jpeg';

        return {
          ...item,
          fileSrc: `data:${mimeType};base64,${item.file}`
        };
      });

    });
  }

  deleteImage(id: number) {
    this.galleryService.delete(id)
      .subscribe(() => this.loadGallery());
  }

  reset() {
    this.title = '';
    this.previewUrl = null;
    this.selectedFileType = '';
  }
    back() {
    this.location.back();  // ✅ goes to previous page
  }
}