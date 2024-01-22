import { Routes } from '@angular/router';
import { HeroListComponent } from './heroes-list/hero-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin.component';

export const routes: Routes = [
   {
      path: 'admin',
      component: AdminDashboardComponent
    },
    {
      path: 'heroes', component: HeroListComponent
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
