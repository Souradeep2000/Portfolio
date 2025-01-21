import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { EmailJSResponseStatus, send } from '@emailjs/browser';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  inputFields: {
    type: string;
    name: string;
    label: string;
    value: string;
    required: boolean;
    minLength?: number;
    pattern?: string;
    errorMessage: string | null;
  }[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Your name',
      value: '',
      required: true,
      minLength: 3,
      errorMessage: null,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Your email',
      value: '',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      required: true,
      errorMessage: null,
    },
    {
      type: 'tel',
      name: 'phone',
      label: 'Your phone',
      value: '',
      required: true,
      pattern: '^[0-9]{10}$',
      errorMessage: null,
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      value: '',
      required: true,
      errorMessage: null,
    },
  ];

  isLoading: boolean = false;

  errorMessages = {
    required: 'This field is required',
    minLength: 'Minimum length not met',
    pattern: 'Invalid format',
  };

  onFocus(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentElement;
    if (parent) {
      parent.classList.add('focus');
    }
  }

  onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    const field = this.inputFields.find((f) => f.name === input.name);
    if (field) {
      field.errorMessage = this.validateField(field);
    }

    const parent = input.parentElement;
    if (parent && input.value.trim() === '') {
      parent.classList.remove('focus');
    }
  }

  validateField(field: any): string | null {
    if (field.required && !field.value.trim()) {
      return this.errorMessages.required;
    }
    if (field.minLength && field.value.length < field.minLength) {
      return `Minimum ${field.minLength} characters required.`;
    }
    if (field.pattern && !new RegExp(field.pattern).test(field.value)) {
      if (field.name === 'email') {
        return 'Please enter a valid email address.';
      }
      if (field.name === 'phone') {
        return 'Please enter a valid phone number.';
      }
      return this.errorMessages.pattern;
    }
    return null;
  }

  onSubmit(): void {
    let isValid = true;

    this.inputFields.forEach((field) => {
      const errorMessage = this.validateField(field);
      field.errorMessage = errorMessage;
      if (errorMessage) {
        isValid = false;
      }
    });

    if (!isValid) {
      console.error('Validation failed:', this.inputFields);
      return;
    }

    this.isLoading = true;

    const templateParams = {
      from_name: this.inputFields.find((field) => field.name === 'name')?.value,
      thier_email: this.inputFields.find((field) => field.name === 'email')
        ?.value,
      thier_phone: this.inputFields.find((field) => field.name === 'phone')
        ?.value,
      message: this.inputFields.find((field) => field.name === 'message')
        ?.value,
      to_name: 'Souradeep',
    };

    send(
      environment.emailServiceId,
      environment.emailTemplateId,
      templateParams,
      environment.emailPublicKey
    )
      .then((response: EmailJSResponseStatus) => {
        console.log('Email successfully sent!', response);
        alert('Your message has been sent!');
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
        alert('Something went wrong, please try again later.');
        this.isLoading = false;
      });
  }
}
