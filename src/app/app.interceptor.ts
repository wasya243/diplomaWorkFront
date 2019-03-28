import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthTokenService } from './auth/auth-token.service';
import { StorageService } from './core/storage.service';
import { Router } from '@angular/router';

// TODO: move to the environments
const apiBaseURL = 'http://localhost:3000/v1';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private storageService: StorageService,
              private authTokenService: AuthTokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedRequest = req.url.startsWith('assets') ? req : req.clone({ url: `${apiBaseURL}${req.url}` });

    return next.handle(modifiedRequest)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              switch (err.status) {
                case 401:
                  this.authTokenService.removeToken();
                  this.storageService.removeUserData();
                  this.router.navigate([ 'login' ]);
                  break;
              }
            }
          })
      );
  }
}
