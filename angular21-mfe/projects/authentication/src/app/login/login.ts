import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private router = inject(Router);

  email = '';
  password = '';

  login() {
    console.log(this.email, this.password);
    localStorage.setItem('token', 'logged-in');
    // Navigate to todo page - Router will work since we're loaded within the shell
    this.router.navigate(['/todo']).catch(() => {
      // Fallback to window.location if Router navigation fails
      window.location.href = '/todo';
    });
  }

}