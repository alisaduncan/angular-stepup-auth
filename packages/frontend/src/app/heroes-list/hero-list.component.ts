// TODO: Feature Componetized like CrisisCenter
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeroService } from '../hero.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent {
  private heroesService = inject(HeroService);
  heroes$ = this.heroesService.getHeroes();
}
