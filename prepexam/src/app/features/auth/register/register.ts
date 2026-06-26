import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {

  registerForm!: FormGroup;

  showOtp = false;
  demoOtp = '1234';

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  otpLength = 4;
  otpBoxes = new Array(4);
  otpArray: string[] = new Array(4).fill('');

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required]
    });
  }

  // SEND OTP
  sendOtp(): void {
    if (this.registerForm.invalid) {
      this.showToast('Fill all fields correctly', 'error');
      return;
    }

    this.showOtp = true;
    this.otpArray = new Array(this.otpLength).fill('');
    this.showToast('OTP sent successfully', 'success');
  }

  // OTP INPUT
  onOtpInput(event: any, index: number): void {
    const value = event.target.value;

    if (!/^[0-9]$/.test(value)) {
      this.otpArray[index] = '';
      event.target.value = '';
      return;
    }

    this.otpArray[index] = value;

    const next = event.target.nextElementSibling;
    if (next) next.focus();
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prev = input.previousElementSibling as HTMLInputElement;
      if (prev) prev.focus();
    }

    if (!/^[0-9]$/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  getOtpValue(): string {
    return this.otpArray.join('');
  }

  // VERIFY & REGISTER
  verifyOtp(): void {
    const otp = this.getOtpValue();

    if (otp !== this.demoOtp) {
      this.showToast('Invalid OTP', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push({
      ...this.registerForm.value,
      verified: true,
      createdAt: new Date()
    });

    localStorage.setItem('users', JSON.stringify(users));

    this.showToast('Registration successful', 'success');

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  // LOGIN NAV
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  resendOtp(): void {
    this.otpArray = new Array(this.otpLength).fill('');
    this.showToast('OTP resent', 'success');
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast(): void {
    this.toastMessage = '';
  }
}
