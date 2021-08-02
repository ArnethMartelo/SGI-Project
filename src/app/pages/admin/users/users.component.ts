import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from './../../../shared/components/modal/modal.component';
import { UsersService } from '@shared/services/users.service';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'idNumber',
    'idType',
    'lastName',
    'name',
    'address',
    'phoneNumber',
    'email',
    'role',
    'position',
    'status',
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

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.usersService.list().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onDelete(userId: string): void {
    if (window.confirm('¿Seguro quieres eliminar este usuario?')) {
      this.usersService
        .delete(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert(res.message);
        });
    }
  }

  openDialog(user = {}): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '40vw',
      height: '90vh',
      hasBackdrop: false,
      data: { title: 'Nuevo Usuario',icon: 'person_add_alt', user },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
