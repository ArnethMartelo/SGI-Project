import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentRoutingModule } from './incident-routing.module';
import { IncidentComponent } from './incident.component';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [IncidentComponent],
  imports: [
    MaterialModule,
    CommonModule,
    IncidentRoutingModule,
    NgbTimepickerModule,
  ],
})
export class IncidentModule {}
