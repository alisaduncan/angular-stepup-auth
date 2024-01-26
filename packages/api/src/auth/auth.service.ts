import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import OktaJwtVerifier from '@okta/jwt-verifier';
import { map, take } from 'rxjs';

interface Config {
  issuer: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private verifier!: OktaJwtVerifier;

  constructor(private readonly httpService: HttpService) { }

  onModuleInit() {
    this.httpService.get<Config>('https://stepup-auth-config-2fe0cebff4a1.herokuapp.com/config').pipe(
      map(response => response.data.issuer),
      take(1)
    ).subscribe( issuer => this.verifier = new OktaJwtVerifier({issuer}));
  }

  public getAccessTokenFromRequest(req: any): string {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) {
      return undefined;
    }

    const accessToken = match[1];
    if (!accessToken) {
      return undefined;
    }

    return accessToken;
  }

  public async verifyAccessToken(accessToken: string): Promise<boolean> {
    try {
      await this.verifier.verifyAccessToken(accessToken, 'api://default');
    } catch (err) {
      throw err;
    }

    return true;
  }

  public async verifyAccessTokenAndGetAcrClaim(accessToken): Promise<string> {
    const jwt = await this.verifier.verifyAccessToken(accessToken, 'api://default');
    return jwt.claims['acr'] as string ?? '';
  }
}
