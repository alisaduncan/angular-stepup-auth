import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  template: `
    <h2>Admin Dashboard</h2>
    <p>Manage your crises and heroes here! These actions are extra sensitive.</p>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminDashboardComponent { }
