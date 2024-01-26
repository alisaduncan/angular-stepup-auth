import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgForOf, AsyncPipe],
  template: `
    <h2>We have the finest heroes!</h2>
    <p class="marketing-text">Got a crisis? Call us now so we can dispatch world-famous heroes such as</p>
    <div class="heroes-menu">
      @for(hero of heroes$ | async; track hero.name) {
        <span>{{hero.name}}</span>
      }
    </div>
  `,
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent {
  private heroesService = inject(HeroService);
  public heroes$ = this.heroesService.getFeaturedHeroes();
}
