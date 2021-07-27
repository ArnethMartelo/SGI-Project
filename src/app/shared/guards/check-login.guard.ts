import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    //manejo de rutas
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => !isLogged)
    );
  }
}
