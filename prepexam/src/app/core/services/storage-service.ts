import { Injectable } from '@angular/core';

export const STORAGE_KEYS = {

  USERS: 'users',

  CURRENT_USER: 'currentUser',

  LOGIN: 'isLoggedIn',

  EXAM: 'selectedExam',

  GOAL: 'goal',

  SUBJECT: 'subject',

  ASSESSMENT: 'assessment',

  PRACTICE: 'practice',

  REPORTS: 'reports',

  NOTIFICATIONS: 'notifications',

  SETTINGS: 'settings',

  THEME: 'theme',

  STREAK: 'streak'

};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  // ===========================
  // LOCAL STORAGE
  // ===========================

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {

    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  getKeys(): string[] {
    return Object.keys(localStorage);
  }

  // ===========================
  // SESSION STORAGE
  // ===========================

  setSession<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSession<T>(key: string): T | null {

    const data = sessionStorage.getItem(key);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearSession(): void {
    sessionStorage.clear();
  }

  // ===========================
  // HELPERS
  // ===========================

  update<T extends object>(key: string, value: Partial<T>): void {

    const current = this.get<T>(key);

    if (current) {

      const updated = {
        ...current,
        ...value
      };

      this.set(key, updated);
    }

  }

  push<T>(key: string, item: T): void {

    const list = this.get<T[]>(key) || [];

    list.push(item);

    this.set(key, list);

  }

  replace<T>(key: string, value: T[]): void {

    this.set(key, value);

  }

  length(key: string): number {

    const data = this.get<any[]>(key);

    return data ? data.length : 0;

  }

}
