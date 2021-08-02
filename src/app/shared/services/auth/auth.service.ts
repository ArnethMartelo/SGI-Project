import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI, UserResponseI, Roles } from '@models/user.interface';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.getToken();
  }

  get user$(): Observable<UserResponseI> {
    return this.user.asObservable();
  }

  get userValue(): UserResponseI {
    return this.user.getValue();
  }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http
      .post<UserResponseI>(`${environment.API_URL}/signin`, authData)
      .pipe(
        map((user: UserResponseI) => {
          this.saveStorage(user);
          this.user.next(user);
          return user;
        }),
        catchError((e) => this.handlerError(e))
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  private saveStorage(user: UserResponseI): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private getToken(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
        // this.loggedIn.next(true);
        // this.role.next(user.role);
        // this.userToken.next(user.token);
      }
    }
  }

  private handlerError(e: any): Observable<never> {
    let errorMessage = 'An error occurred retrienving data';
    if (e) {
      errorMessage = `Error: code ${e.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
