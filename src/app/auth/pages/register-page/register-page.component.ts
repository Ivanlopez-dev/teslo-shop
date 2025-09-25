import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);

      return
    }

    const { email = '', password = '', fullName = '' } = this.registerForm.value;

    this.authService.register(email!, password!, fullName!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
    })
  }
}
