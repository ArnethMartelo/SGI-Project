import { IMAGES_ROUTES } from 'src/app/data/constants/routes/images.routes';
import { AuthService } from '@app/pages/auth/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public $imagesRoutes = IMAGES_ROUTES;
  public backgroundStyle: any;

  constructor(public authService: AuthService) {
    this.backgroundStyle = {
      backgroundImage: `url(${this.$imagesRoutes.HOME})`,
    };
  }

  ngOnInit(): void {}
}
