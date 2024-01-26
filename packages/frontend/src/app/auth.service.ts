import { Injectable, inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState, TokenParams, decodeToken } from '@okta/okta-auth-js';
import { map } from 'rxjs';

export const INSUFFICIENT_AUTH = 'insufficient_user_authentication';
export const ACR_VALUES_1FA = 'urn:okta:loa:1fa:any';
export const ACR_VALUES_2FA = 'urn:okta:loa:2fa:any';
export const ACR_VALUES_PHR = 'phr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oktaAuth = inject(OKTA_AUTH);
  private oktaStateService = inject(OktaAuthStateService);

  public isAuthenticated$ = this.oktaStateService.authState$.pipe(
    map((authState: AuthState) => authState.isAuthenticated ?? false)
  );

  public getAccessToken(): string {
    return this.oktaAuth.getAccessToken() ?? '';
  }

  public getIdToken(): string {
    return this.oktaAuth.getIdToken() ?? '';
  }

  public getIdTokenAcrClaim() {
    return decodeToken(this.getIdToken()).payload.acr ?? ''
  }

  public async login(acrVals?: string, route?: string): Promise<void> {
    const options: TokenParams = {
      acrValues: acrVals ?? undefined
    };

    if (route) {
      this.oktaAuth.setOriginalUri(route)
    }

    return await this.oktaAuth.signInWithRedirect(options);
  }

  public async logout(): Promise<boolean> {
    return await this.oktaAuth.signOut()
  }
}
