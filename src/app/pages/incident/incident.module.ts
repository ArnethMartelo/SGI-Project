import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentRoutingModule } from './incident-routing.module';

import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { IncidentComponent } from './incident.component';

import { IncidentModalComponent } from './incident-modal/incident-modal.component'
import { ModalComponent } from '@app/pages/admin/users/users-modal/modal.component';

@NgModule({
  declarations: [IncidentComponent, IncidentModalComponent, ModalComponent],
  imports: [
    MaterialModule,
    CommonModule,
    IncidentRoutingModule,
    NgbTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IncidentModule {}
