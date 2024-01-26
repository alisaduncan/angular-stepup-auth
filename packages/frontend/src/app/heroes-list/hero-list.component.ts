import { Component, inject } from '@angular/core';

import { HeroService } from '../hero.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h2>Heroes</h2>

    <p>Authentication required for see the list of heroes with their id information</p>

    <ul class="heroes">
      @for (hero of heroes$ | async; track hero.id) {
        <li class="hero">
          <span class="badge">{{ hero.id }}</span>{{ hero.name }}
        </li>
      }
    </ul>
  `,
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent {
  private heroesService = inject(HeroService);
  heroes$ = this.heroesService.getHeroes();
}
