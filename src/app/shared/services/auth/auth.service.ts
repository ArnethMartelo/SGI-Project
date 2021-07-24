import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../../models/user.interface';
import { JwtResponseI } from '../../models/jwt-response';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = environment.API_URL;
  private authSubject = new BehaviorSubject<boolean> (false);
  private token: string | null = '';
  constructor(private httpClient: HttpClient) {}

  get isLogged(): Observable<boolean>{
    return this.authSubject.asObservable();
  }

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/register`, user)
      .pipe(
        tap((res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user)
      .pipe(
        tap((res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  private getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }
}
