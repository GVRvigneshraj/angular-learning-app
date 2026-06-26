import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage-service';
import { Router } from '@angular/router';

export interface LoginRequest {
  mobile: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER = 'currentUser';
  private readonly LOGIN_KEY = 'isLoggedIn';
  private readonly DEMO_OTP = '1234';

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  // ==============================
  // Send OTP
  // ==============================

  sendOtp(mobile: string): boolean {

    if (!mobile || mobile.length !== 10) {
      return false;
    }

    console.log('Demo OTP : 1234');

    return true;

  }

  // ==============================
  // Verify OTP
  // ==============================

  verifyOtp(otp: string): boolean {

    return otp === this.DEMO_OTP;

  }

  // ==============================
  // Register User
  // ==============================

  register(user: any): boolean {

    const users = this.getUsers();

    const exists = users.find(x => x.mobile === user.mobile);

    if (exists) {

      return false;

    }

    user.id = Date.now();

    user.createdDate = new Date();

    users.push(user);

    this.storage.set(this.USERS_KEY, users);

    return true;

  }

  // ==============================
  // Login
  // ==============================

  login(mobile: string): boolean {

    const users = this.getUsers();

    const user = users.find(x => x.mobile === mobile);

    if (!user) {

      return false;

    }

    this.storage.set(this.CURRENT_USER, user);

    this.storage.set(this.LOGIN_KEY, true);

    return true;

  }

  // ==============================
  // Logout
  // ==============================

  logout(): void {

    this.storage.remove(this.CURRENT_USER);

    this.storage.remove(this.LOGIN_KEY);

    this.router.navigate(['/login']);

  }

  // ==============================
  // Logged In
  // ==============================

  isLoggedIn(): boolean {

    return this.storage.get(this.LOGIN_KEY) === true;

  }

  // ==============================
  // Current User
  // ==============================

  getCurrentUser(): any {

    return this.storage.get(this.CURRENT_USER);

  }

  // ==============================
  // Update User
  // ==============================

  updateProfile(user: any): void {

    const users = this.getUsers();

    const index = users.findIndex(x => x.id === user.id);

    if (index >= 0) {

      users[index] = user;

      this.storage.set(this.USERS_KEY, users);

      this.storage.set(this.CURRENT_USER, user);

    }

  }

  // ==============================
  // Get Users
  // ==============================

  getUsers(): any[] {

    return this.storage.get(this.USERS_KEY) || [];

  }

  // ==============================
  // User Exists
  // ==============================

  userExists(mobile: string): boolean {

    return this.getUsers().some(x => x.mobile === mobile);

  }

  // ==============================
  // Delete User
  // ==============================

  deleteUser(id: number): void {

    const users = this.getUsers().filter(x => x.id !== id);

    this.storage.set(this.USERS_KEY, users);

  }

  // ==============================
  // Clear All Users
  // ==============================

  clearUsers(): void {

    this.storage.remove(this.USERS_KEY);

  }

}
