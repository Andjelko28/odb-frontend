import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  error?: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit(): void {
    // if (this.loginForm.invalid) {
    //   this.loginForm.markAllAsTouched();
    //   return;
    // }
    const { email, password } = this.loginForm.value;
    this.loading = true;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.loginForm.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // this.error = err.error?.message || 'Logging in failed. Please try again.';
        this.loading = false;
        if (err.status === 401) {
          const passwordControl = this.loginForm.get('password');
          const emailControl = this.loginForm.get('email');
          emailControl?.setErrors({ invalidCredentials: true });
          emailControl?.markAsTouched();
          passwordControl?.setErrors({ invalidCredentials: true });
          passwordControl?.markAsTouched();
        } else {
          this.loginForm.setErrors({ serverError: true });
        }
      },
    });
  }
}
