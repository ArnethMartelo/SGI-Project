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
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  private userToken = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    this.getToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<Roles> {
    return this.role.asObservable();
  }

  get userTokenValue(): string {
    return this.userToken.getValue();
  }

  // register(authData: UserI): Observable<UserResponseI> {
  //   return this.http
  //     .post<UserResponseI>(`${environment.API_URL}/signup`, authData)
  //     .pipe(
  //       map((res: UserResponseI) => {
  //         if (res) {
  //           // guardar token
  //           this.saveStorage(res);
  //         }
  //       })
  //     );
  // }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http
      .post<UserResponseI>(`${environment.API_URL}/signin`, authData)
      .pipe(
        map((user: UserResponseI) => {
          this.saveStorage(user);
          this.loggedIn.next(true);
          this.role.next(user.role);
          this.userToken.next(user.token);

          return user;
        }),
        catchError((e) => this.handlerError(e))
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.role.next(null);
    this.userToken.next('');
    this.router.navigateByUrl('');
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
        this.loggedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token);
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
