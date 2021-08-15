import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '@app/pages/admin/users/users-modal/modal.component';
import { UsersService } from '@app/pages/admin/users/users-service/users.service';
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
import { UserFormTemplate } from '@app/shared/utils/user-form-template';

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
    private usersService: UsersService,
    private dialog: MatDialog,
    public userForm: UserFormTemplate
  ) {}

  ngOnInit(): void {
    this.usersService
      .list()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
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
          console.log(res);
          window.alert(res.value);
        });
    }
  }

  openDialog(user = {}): void {

    this.dialog.open(ModalComponent, {
      width: '60vw',
      height: '90vh',
      data: { title: 'Nuevo Usuario', icon: 'person_add_alt', user },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
