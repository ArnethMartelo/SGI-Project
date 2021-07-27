import { AuthService } from './../../services/auth/auth.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin:string|null = null;
  isLogged: boolean = false;

  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogged
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isLogged = res));

    this.authService.isAdmin$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isAdmin = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
