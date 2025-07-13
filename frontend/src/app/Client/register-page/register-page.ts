import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Servies/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOtpInputModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  registerForm: FormGroup;
  isSubmitted: boolean = false;
  showOtpField = false;
  otpError = false;
  mobileVerified = false;
  otpValue = '';

  otpConfig = {
    allowNumbersOnly: true,
    length: 6,
    inputStyles: { width: '40px', height: '40px' }
  };

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private authService: AuthService, private http: HttpClient) {
    this.registerForm = this.fb.group({
      LoginName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', Validators.required],
    });

    this.registerForm.get('mobileNumber')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => /^[6-9]\d{9}$/.test(value))
      )
      .subscribe(value => {
        this.sendOtp(value);
      });
  }

  sendOtp(mobile: string) {
    this.http.post('http://localhost:5000/api/otp/send', {
      mobileNumber: mobile
    }).subscribe({
      next: () => {
        this.showOtpField = true;
        this.otpError = false;
      },
      error: (err) => {
        console.error('OTP send failed', err);
        this.showOtpField = false;
        alert('Failed to send OTP');
      }
    });
  }

  onOtpChange(otp: string) {
    this.otpValue = otp;
    if (otp.length === 6) {
      this.verifyOtp(otp);
    }
  }

  verifyOtp(otp: string) {
    const mobile = this.registerForm.get('mobileNumber')?.value;
    this.http.post('http://localhost:5000/api/otp/verify', {
      mobileNumber: mobile,
      otp: otp
    }).subscribe({
      next: () => {
        this.mobileVerified = true;
        this.otpError = false;
      },
      error: () => {
        this.mobileVerified = false;
        this.otpError = true;
      }
    });
  }

  onRegisterSubmit() {
    this.isSubmitted = !this.isSubmitted;
    if (this.registerForm.valid) {
      const { LoginName, email, password, confirmPassword, mobileNumber } = this.registerForm.value;
      if (password !== confirmPassword) {
        this.snackBar.open('Passwords do not match', 'Close', { duration: 3000, verticalPosition: 'top', panelClass: ['error-snackbar'] });
        this.registerForm.markAllAsTouched();
        return;
      }
      if (!LoginName || !email || !password || !mobileNumber) {
        this.snackBar.open('Please enter the values', 'Close', { duration: 3000, verticalPosition: 'top', panelClass: ['error-snackbar'] });
        this.registerForm.markAllAsTouched();
        return;
      }

      this.authService.register(LoginName, email, password, mobileNumber).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          this.snackBar.open(response.message, 'Continue', { duration: 3000, verticalPosition: 'top', panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          this.registerForm.markAllAsTouched();
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000, verticalPosition: 'top', panelClass: ['error-snackbar'] });
          console.error(err);
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
