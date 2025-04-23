import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <form (ngSubmit)="login()" class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl mb-6 font-bold">Login</h1>
        <input [(ngModel)]="username" name="username" type="text" placeholder="Username" class="border p-2 w-full mb-4" required>
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password" class="border p-2 w-full mb-6" required>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full cursor-pointer">Login</button>
      </form>
    </div>
  `,
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const success = this.auth.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/conversations']);
    } else {
      alert('Invalid credentials');
    }
  }
}
