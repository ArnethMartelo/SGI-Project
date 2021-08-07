import { IncidentService } from './incident-service/incident.service';
import { takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IncidentModalComponent } from './incident-modal/incident-modal.component';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})
export class IncidentComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'serial',
    'date',
    'description',
    'victim',
    'type',
    'site',
    'deadly',
    'informer',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private dialog: MatDialog,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.incidentService.list().subscribe((incidents) => {
      this.dataSource.data = incidents;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onDelete(incidentId: string): void {
    if (window.confirm('¿Seguro quieres eliminar este incidente?')) {
      this.incidentService
        .delete(incidentId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert('Incidente Eliminado');
        });
    }
  }

  openDialog(incident = {}): void {
    this.dialog.open(IncidentModalComponent, {
      width: '40vw',
      height: '90vh',
      hasBackdrop: false,
      data: { title: 'Nuevo Incidente', icon: 'add_task', incident },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
