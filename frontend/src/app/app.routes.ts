import { Routes } from '@angular/router';
import { HomePage } from './Common/home-page/home-page';
import { LoginPage } from './Client/login-page/login-page';
import { AuthGuard } from './Interceptors/auth.guard/auth.guard';
import { RegisterPage } from './Client/register-page/register-page';
import { ResetPage } from './Client/reset-page/reset-page';
import { Dashboard } from './Common/dashboard/dashboard';
import { Transaction } from './Common/transaction/transaction';
import { Accounts } from './Common/accounts/accounts';
import { Settings } from './Common/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'reset', component: ResetPage },
  {
    path: 'home',
    component: HomePage, // This is your layout with sidebar
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
      { path: 'transactions', component: Transaction },
      { path: 'accounts', component: Accounts },
      { path: 'settings', component: Settings },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
