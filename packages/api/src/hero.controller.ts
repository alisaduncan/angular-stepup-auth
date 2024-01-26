import { Controller, Get } from '@nestjs/common';
import { Hero, HEROES } from './hero';

@Controller('heroes')
export class HeroController {
  @Get()
  getHeroes() {
    return HEROES;
  }
}
