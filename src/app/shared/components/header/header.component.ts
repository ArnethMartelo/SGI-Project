import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  isLogged = false;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe((res) => (this.isLogged = res));
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
