import { Injectable, NestMiddleware, mixin } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface StepupAuthChallengeRequiredOptions {
  acrValue: string;
  maxAge?: number;
}

export function StepupMiddlewareCreator(options: StepupAuthChallengeRequiredOptions) {
  @Injectable()
  class StepupMiddleware implements NestMiddleware {
    authService: AuthService;

    constructor(authService: AuthService) {
      this.authService = authService;
    }

    async use(req: any, res: any, next: () => void) {
      const accessToken = this.authService.getAccessTokenFromRequest(req);
      if (!accessToken) {
        res.status(401).send();
      }

      const { acrValue } = options;
      const errorCode = `Bearer error="insufficient_user_authentication",error_description="A different authentication level is required",acr_values="${acrValue}"`;
      const header = 'WWW-Authenticate';

      const acr = await this.authService.verifyAccessTokenAndGetAcrClaim(accessToken);
      if (acr === '' || acr !== acrValue) {
        res.setHeader(header, errorCode);
        return res.status(401).send();
      }

      next();
    }
  }

  return mixin(StepupMiddleware);
}

