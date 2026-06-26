import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((c) => c.Login),
  },

  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((c) => c.Register),
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./features/onboarding/onboarding').then((m) => m.Onboarding),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'subjects',
    loadComponent: () => import('./features/subjects/subjects').then((m) => m.Subjects),
  },
  {
    path: 'chapters',
    loadComponent: () => import('./features/chapters/chapters').then((m) => m.Chapters),
  },
  {
    path: 'mcq',
    loadComponent: () => import('./features/mcq/mcq').then((m) => m.Mcq),
  },
];
