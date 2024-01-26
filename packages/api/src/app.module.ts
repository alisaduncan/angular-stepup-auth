import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroController } from './hero.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthService } from './auth/auth.service';
import { StepupMiddlewareCreator } from './auth/stepup.middleware';
import { FeaturedController } from './featured.controller';


@Module({
  imports: [HttpModule],
  controllers: [AppController, HeroController, FeaturedController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(
      AuthMiddleware,
      StepupMiddlewareCreator({acrValue: 'urn:okta:loa:2fa:any'})
    ).forRoutes('heroes');
  }
}
