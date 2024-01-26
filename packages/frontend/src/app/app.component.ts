import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  template: `
    <h1 class="page-title">Tour of Heroes</h1>
    <nav class="nav-menu">
      <ul>
        <li><a routerLink="/dashboard">Dashboard</a></li>
        @if(isAuthenticated$ | async) {
          <li><a routerLink="/heroes">Heroes</a></li>
          <li><a routerLink="/admin">Admin</a></li>
          <li><a class="auth-link" (click)="onLogout()">Log out</a></li>
        } @else {
          <li><a class="auth-link" (click)="onLogin()">Log in</a></li>
        }
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { 
  private authService = inject(AuthService);
  public isAuthenticated$ = this.authService.isAuthenticated$;

  public onLogin(): void {
    this.authService.login();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
