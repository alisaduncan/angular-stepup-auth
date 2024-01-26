import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private authService: AuthService) { }
  
  async use(req: any, res: any, next: () => void) {
    const accessToken = this.authService.getAccessTokenFromRequest(req);
    if (!accessToken) {
      return res.status(401).send();
    }

    try {
      await this.authService.verifyAccessToken(accessToken);
    } catch (err) { 
      console.error(err)

      return res.status(401).send(err.message);
    }

    next();
  }
}
