import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from './contact.service';



@Component({
  selector: 'app-contact',
   imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

contactData = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+91',
  phone: '',
  subject: '',
  message: ''
};

  constructor(private contactService: ContactService) {}

  countries = [
  { name: 'India', code: '+91' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Australia', code: '+61' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'Canada', code: '+1' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'Singapore', code: '+65' },
  { name: 'Japan', code: '+81' }
];


submitContact() {

  const fullPhone =
    this.contactData.countryCode + this.contactData.phone;

  const payload = {
    ...this.contactData,
    phone: fullPhone
  };

  this.contactService.submitContact(payload)
    .subscribe({
      next: () => {
        alert('Message sent successfully!');
        this.contactData = {
          firstName: '',
          lastName: '',
          email: '',
          countryCode: '+91',
          phone: '',
          subject: '',
          message: ''
        };
      },
      error: () => {
        alert('Failed to send message.');
      }
    });
}


}
