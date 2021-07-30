import { AuthService } from './../../services/auth/auth.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  HostBinding,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  takeUntil,
  throttleTime,
} from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden',
}

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // animations: [
  //   trigger('toggle', [
  //     state(
  //       VisibilityState.Hidden,
  //       style({ opacity: 0, transform: 'translateY(-100%)' })
  //     ),
  //     state(
  //       VisibilityState.Visible,
  //       style({ opacity: 1, transform: 'translateY(0)' })
  //     ),
  //     transition('* => *', animate('500ms ease-in')),
  //   ]),
  // ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isVisible = true;
  isAdmin: string | null = null;
  isLogged: boolean = false;

  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  constructor(private authService: AuthService) {}

  // ngAfterViewInit() {
  //   const scroll$ = fromEvent(window, 'scroll').pipe(
  //     throttleTime(10),
  //     map(() => window.pageYOffset),
  //     pairwise(),
  //     map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
  //     distinctUntilChanged(),
  //     share()
  //   );

  //   const scrollUp$ = scroll$.pipe(
  //     filter((direction) => direction === Direction.Up)
  //   );

  //   const scrollDown$ = scroll$.pipe(
  //     filter((direction) => direction === Direction.Down)
  //   );

  //   scrollUp$.subscribe(() => (this.isVisible = true));
  //   scrollDown$.subscribe(() => (this.isVisible = false));
  // }

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
