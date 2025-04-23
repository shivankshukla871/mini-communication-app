import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated = signal(false);
  user = signal<{ username: string } | null>(null);

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin@123') {
      this.isAuthenticated.set(true);
      this.user.set({ username });
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    this.user.set(null);
  }
}
