import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  inputFields = [
    { type: 'text', name: 'name', label: 'Your name', value: '' },
    { type: 'email', name: 'email', label: 'Your email', value: '' },
    { type: 'tel', name: 'phone', label: 'Your phone', value: '' },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      value: '',
    },
  ];

  onFocus(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentElement;
    if (parent) {
      parent.classList.add('focus');
    }
  }

  onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    const parent = input.parentElement;
    if (parent && input.value.trim() === '') {
      parent.classList.remove('focus');
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.inputFields);
  }
}
