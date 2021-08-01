import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('user')) {
      const authToken = this.authService.userTokenValue;
      const authReq = req.clone({
        setHeaders: {
          authorization: authToken,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
