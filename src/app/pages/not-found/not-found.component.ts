import { Component, OnInit } from '@angular/core';
import { IMAGES_ROUTES } from 'src/app/data/constants/routes/images.routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  public $imagesRoutes = IMAGES_ROUTES;
  public backgroundStyle: any;

  constructor() {
    this.backgroundStyle = {
      backgroundImage: `url(${this.$imagesRoutes.ERROR_404})`,
    };
  }

  ngOnInit(): void {}
}
