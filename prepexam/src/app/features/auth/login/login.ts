import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  loginForm!: FormGroup;

  showOtp = false;
  demoOtp = '1234';

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  otpLength = 4;
  otpBoxes = new Array(4);
  otpArray: string[] = new Array(4).fill('');

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  get mobile() {
    return this.loginForm.get('mobile')!;
  }

  sendOtp(): void {
    if (this.mobile.invalid) {
      this.showToast('Enter valid mobile number', 'error');
      return;
    }

    this.showOtp = true;
    this.otpArray = new Array(this.otpLength).fill('');
    this.showToast('OTP sent successfully', 'success');
  }

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

  verifyOtp(): void {
    const otp = this.getOtpValue();

    if (otp !== this.demoOtp) {
      this.showToast('Invalid OTP', 'error');
      return;
    }

    localStorage.setItem('user', JSON.stringify({
      mobile: this.mobile.value,
      isLoggedIn: true
    }));

    this.showToast('Login successful', 'success');

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  resendOtp(): void {
    this.otpArray = new Array(this.otpLength).fill('');
    this.showToast('OTP resent', 'success');
  }

  closeToast(): void {
    this.toastMessage = '';
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }
}
