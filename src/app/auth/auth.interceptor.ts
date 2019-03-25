import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authTokenService: AuthTokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(this.authTokenService.hasAccessToken() ? this.signRequest(req) : req);
  }

  signRequest(request: HttpRequest<any>): HttpRequest<any> {
    const authHeader = this.authTokenService.getAuthorizationHeader();

    return request.clone({ headers: request.headers.set(`Authorization`, authHeader) });
  }
}
