import { Routes } from '@angular/router';
import { HeroListComponent } from './heroes-list/hero-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { authGuard, stepupGuard } from './auth.guard';
import { ACR_VALUES_2FA } from './auth.service';

export const routes: Routes = [
    {
      path: 'admin',
      component: AdminDashboardComponent,
      canActivate: [authGuard, stepupGuard],
      data: { acrReq: ACR_VALUES_2FA }
    },
    { path: 'heroes', component: HeroListComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login/callback', component: OktaCallbackComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
