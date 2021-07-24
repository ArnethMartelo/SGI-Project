import { AuthService } from './../../shared/services/auth/auth.service';
import { IMAGES_ROUTES } from '../../data/constants/routes/images.routes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  public $imagesRoutes = IMAGES_ROUTES;
  public backgroundStyle: any;

  hide = true;
  user: UserI;

  constructor(private authService: AuthService, private router: Router) {
    this.user = { username: '', email: '', password: '' };

    this.backgroundStyle = {
      backgroundImage: `url(${this.$imagesRoutes.BACKGROUND_LOGIN})`,
    };
  }

  ngOnInit(): void {}

  onLogin(f: any): void {
    this.authService.login(f.value).subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('/incident');
      }
    });
  }
}
