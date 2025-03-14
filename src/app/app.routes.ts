import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home.component';
import { OnboardingLayoutComponent } from './layouts/onboarding-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Welcome home, buddy!', pathMatch: 'full' },
      // { path: 'sign-in', loadComponent: () => import('./signin.component').then(c => c.SigninComponent) },
      // { path: 'sign-up', loadComponent: () => import('./signup.component').then(c => c.SignupComponent) },
      { path: 'pricing', loadComponent: () => import('./pricing.component').then(c => c.PricingComponent) },
      { path: 'how-it-works', loadComponent: () => import('./how-it-works.component').then(c => c.HowItWorksComponent) },
      { path: 'testimonials', loadComponent: () => import('./testimonials.component').then(c => c.TestimonialsComponent) },
      { path: 'features', loadComponent: () => import('./features.component').then(c => c.FeaturesComponent) },
      { path: 'forgot-password', loadComponent: () => import('./forgot-password.component').then(c => c.ForgotPasswordComponent) },
    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth.routes').then(c => c.auth_routes),
  },
  
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard], 
    loadChildren: () => import('./dashboard/dashboard.routes').then(c => c.dashboard_routes),
  },
  {
    path: 'onboarding',
    component: OnboardingLayoutComponent,
    canActivate: [AuthGuard], 
    loadChildren: () => import('./onboarding/onboarding.routes').then(c => c.onboarding_routes),
  },
  { path: '**', redirectTo: '' },
];