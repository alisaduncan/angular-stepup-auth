import { Controller, Get } from '@nestjs/common';
import { HEROES } from './hero';

@Controller('featured')
export class FeaturedController {
  @Get()
  getHeroes() {
    return HEROES.slice(-3);
  }
}
