import { Component, OnInit } from '@angular/core';
import { SeoService } from './services/seo.service';
import { authService } from './services/authService.service';
import { api2Service } from './services/api2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'film-app';
  showSpinner = false;
  favoriteFilmIds
  login
  constructor(private seo: SeoService,
    private auth: authService,
    private api2Service: api2Service,) {

  }

  ngOnInit() {
/*     this.seo.initDefaultMetaInfomation() */
  }

}