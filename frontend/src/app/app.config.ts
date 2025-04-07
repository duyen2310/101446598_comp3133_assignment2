import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './services/auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './pages/employee/employees/employees.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthGuard,
    importProvidersFrom(HttpClientModule),
  ],
};