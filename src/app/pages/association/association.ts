import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-association',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './association.html',
  styleUrl: './association.css',
})
export class Association {
constructor(private router: Router) {}
  partners: string[] = [
    'SNF INDIA',
    'NAKASHIMA Japan',
    'SONICPURE',
    'US STERILES',
    'KCPL',
    'DEM ENTERHUB',
    'TOSHCON',
    'OVARRO',
    'DAIKY AXIS',
    'KHERAJ ELECTRICALS',
    'Reputed Pump, Motor and VFD Manufacturer'
  ];
   goToContact() {
    this.router.navigate(['/contact']);
  }

}
