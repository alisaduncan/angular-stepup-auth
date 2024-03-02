import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpBackend, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthConfigService, OktaAuthModule } from '@okta/okta-angular';
import { authInterceptor } from './auth.interceptor';
import { stepupInterceptor } from './stepup.interceptor';
import { tap, take } from 'rxjs';

function configInitializer(httpBackend: HttpBackend, configService: OktaAuthConfigService): () => void {
  return () =>
  new HttpClient(httpBackend)
  .get('https://stepup-auth-config-2fe0cebff4a1.herokuapp.com/config')
  .pipe(
    tap((authConfig: any) => configService.setConfig({oktaAuth: new OktaAuth({...authConfig, redirectUri: `${window.location.origin}/login/callback`, scopes: ['openid', 'profile', 'offline_access']})})),
    take(1)
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      OktaAuthModule
    ),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      authInterceptor,
      stepupInterceptor
    ])),
    { provide: APP_INITIALIZER, useFactory: configInitializer, deps: [HttpBackend, OktaAuthConfigService], multi: true }
  ]
};
