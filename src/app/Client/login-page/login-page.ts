import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Servies/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.isSubmitted = !this.isSubmitted;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: err => {
          this.loginForm.markAllAsTouched();
          this.snackBar.open('Invalid username or password', 'Close', { duration: 3000, verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Enter values to Login', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToResetPage() {
    this.router.navigate(['/reset']);
  }
}