import { IncidentService } from './../../shared/services/incident.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

interface IdType {
  value: string;
  viewValue: string;
}

interface IncidentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})
export class IncidentComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  labelPosition: 'before' | 'after' = 'after';

  idTypeControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  idTypes: IdType[] = [
    { value: 'cedula de ciudadania-0', viewValue: 'Cédula de ciudadanía' },
    { value: 'Tarjeta de identidad-1', viewValue: 'Tarjeta de identidad' },
    { value: 'cedula de extranjeria-2', viewValue: 'cédula de extranjeria' },
    { value: 'Pasaporte-3', viewValue: 'Pasaporte' },
  ];

  incidentTypes: IncidentType[] = [
    { value: 'Transito-0', viewValue: 'Tránsito' },
    { value: 'Deportivo-1', viewValue: 'Deportivo' },
    { value: 'violencia-2', viewValue: 'Violencia' },
    { value: 'trabajo-4', viewValue: 'Propio del trabajo' },
  ];

  time = { hour: 13, minute: 30 };
  meridian = true;

  constructor(private incidentSvc: IncidentService) {}

  ngOnInit(): void {}

  onAddIncident(f: NgForm): void {
    this.incidentSvc.addIncident(f.value);
    if (f.valid) {
      f.resetForm();
    }
  }
}
