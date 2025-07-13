import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Servies/auth.service';

@Component({
  selector: 'app-reset-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-page.html',
  styleUrl: './reset-page.scss'
})
export class ResetPage {
  resetForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private authService: AuthService) {
    this.resetForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onForgotSubmit() {
    this.isSubmitted = !this.isSubmitted;
    this.resetForm.markAllAsTouched();
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }
}
