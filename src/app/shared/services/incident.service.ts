import { IncidentI } from './../models/incident.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  url = 'http://localhost:3000/api/incidents';
  incidents: IncidentI[] = [];
  incidentUpdated = new Subject<IncidentI[]>();

  constructor(private http: HttpClient) {}

  addIncident(incident: IncidentI) {
    this.http;
    this.http
      .post<{ idIncidentAdded: string }>(this.url, incident)
      .subscribe((response) => {
        console.log(response);
        this.incidents.push(incident);
        incident.id = response.idIncidentAdded;
        this.incidentUpdated.next([...this.incidents]);
      });
  }

  getIncident() {
    this.http
      .get<any>(this.url)
      .pipe(
        map((incidentData) => {
          return incidentData.map(
            (incident: {
              _id: string;
              site: string;
              date: Date;
              time: string;
              type: string;
              description: string;
              deadly: boolean;
            }) => {
              return {
                id: incident._id,
                site: incident.site,
                date: incident.date,
                time: incident.time,
                type: incident.type,
                description: incident.description,
                deadly: incident.deadly,
              };
            }
          );
        })
      )
      .subscribe((dataTransformed) => {
        this.incidents = dataTransformed;
        this.incidentUpdated.next([...this.incidents]);
      });
  }

  deleteIncident(id: string) {
    this.http.delete(this.url + '/' + id).subscribe((result) => {
      const updatedIncident = this.incidents.filter(
        (incident) => incident.id !== id
      );
      this.incidents = updatedIncident;
      this.incidentUpdated.next([...this.incidents]);
    });
  }

  getIncidentsUpdateListener() {
    return this.incidentUpdated.asObservable();
  }
}
