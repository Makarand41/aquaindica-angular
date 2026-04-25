import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../admin/services/GalleryService';

@Component({
  standalone: true,
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class Gallery implements OnInit {

  gallery: any[] = [];
  selected: any = null;

  constructor(
    private galleryService: GalleryService,
    private cd: ChangeDetectorRef
  ) {}

ngOnInit() {
  this.galleryService.getAll().subscribe(data => {

    this.gallery = data.map((item: any) => {

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
  open(img: any) {
    this.selected = img;
  }
}