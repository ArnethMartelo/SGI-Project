import { UtilsService } from './../../services/utils.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  onExit(){
    this.authService.logout();
    this.utilsService.opensidebar(false);
  }

}
