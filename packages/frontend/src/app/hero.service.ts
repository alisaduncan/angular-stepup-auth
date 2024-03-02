import { Injectable, inject } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { AuthService, INSUFFICIENT_AUTH } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getFeaturedHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/api/featured').pipe(
      map(res => res || [])
    );
  }

  getHeroes(): Observable<Hero[]> {
    const currentUrl = this.router.routerState.snapshot.url;

    return this.http.get<Hero[]>('/api/heroes').pipe(
      map(res => res || []),
      catchError(error => {
        if (error['name'] === INSUFFICIENT_AUTH) {
          this.authService.login(error['message'], currentUrl);
        }

        return throwError(() => error);
      })
    );
  }
}

