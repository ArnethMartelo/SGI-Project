import { UserI } from '@models/user.interface';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  list(): Observable<UserI[]> {
    return this.http
      .get<UserI[]>(`${environment.API_URL}/user`)
      .pipe(catchError(this.handlerError));
  }

  search(userId: number): Observable<UserI> {
    return this.http
      .get<any>(`${environment.API_URL}/user/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  create(user: UserI): Observable<UserI> {
    return this.http
      .post<UserI>(`${environment.API_URL}/user`, user)
      .pipe(catchError(this.handlerError));
  }

  update(userId: number, user: UserI): Observable<UserI> {
    return this.http
      .put<UserI>(`${environment.API_URL}/user/${userId}`, user)
      .pipe(catchError(this.handlerError));
  }

  delete(userId: number): Observable<any> {
    return this.http
      .delete<UserI>(`${environment.API_URL}/user/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
