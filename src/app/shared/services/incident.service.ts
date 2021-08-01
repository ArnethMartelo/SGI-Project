import { ObjectId } from 'mongoose';
import { IncidentI } from '@models/incident.interface';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  url = `${environment.API_URL}/incident`;
  incidents: IncidentI[] = [];
  incidentBD = new Subject<IncidentI[]>();

  constructor(private http: HttpClient) {}

  addIncident(incident: IncidentI) {
    this.http
      .post<{ idIncidentAdded: string }>(this.url, incident)
      .subscribe((response) => {
        console.log(response);
        this.incidents.push(incident);
        incident.id = response.idIncidentAdded;
        this.incidentBD.next([...this.incidents]);
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
              victim: ObjectId;
              informer: ObjectId;
            }) => {
              return {
                id: incident._id,
                site: incident.site,
                date: incident.date,
                time: incident.time,
                type: incident.type,
                description: incident.description,
                deadly: incident.deadly,
                victim: incident.victim,
                informer: incident.informer,
              };
            }
          );
        })
      )
      .subscribe((dataTransformed) => {
        this.incidents = dataTransformed;
        this.incidentBD.next([...this.incidents]);
      });
  }

  deleteIncident(id: string) {
    this.http.delete(this.url + '/' + id).subscribe((result) => {
      const updatedIncident = this.incidents.filter(
        (incident) => incident.id !== id
      );
      this.incidents = updatedIncident;
      this.incidentBD.next([...this.incidents]);
    });
  }

  getIncidentsUpdateListener() {
    return this.incidentBD.asObservable();
  }
}
