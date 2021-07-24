import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentComponent } from './incident.component';

const routes: Routes = [{ path: '', component: IncidentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule { }
