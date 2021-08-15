import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IncidentI } from '@shared/models/incident.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(private http: HttpClient) {}

  list(): Observable<IncidentI[]> {
    return this.http
      .get<IncidentI[]>(`${environment.API_URL}/incident`)
      .pipe(catchError(this.handlerError));
  }

  search(incidentId: string): Observable<IncidentI> {
    return this.http
      .get<any>(`${environment.API_URL}/incident/${incidentId}`)
      .pipe(catchError(this.handlerError));
  }

  create(incident: IncidentI): Observable<IncidentI> {
    return this.http
      .post<IncidentI>(`${environment.API_URL}/incident`, incident)
      .pipe(catchError(this.handlerError));
  }

  update(incidentId: string, incident: IncidentI): Observable<IncidentI> {
    return this.http
      .put<IncidentI>(`${environment.API_URL}/incident/${incidentId}`, incident)
      .pipe(catchError(this.handlerError));
  }

  delete(incidentId: string): Observable<any> {
    return this.http
      .delete<IncidentI>(`${environment.API_URL}/incident/${incidentId}`)
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
