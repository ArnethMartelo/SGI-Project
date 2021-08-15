import { AuthService } from '../../pages/auth/auth-service/auth.service';
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
    if (req.url.includes('user') || req.url.includes('incident')) {
      const userValue = this.authService.userValue;
      const authReq = req.clone({
        setHeaders: {
          authorization: userValue.token,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
