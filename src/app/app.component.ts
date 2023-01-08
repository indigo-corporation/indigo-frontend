import { Component, OnInit } from '@angular/core';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'film-app';
  constructor(private seo:SeoService) {
  }

  ngOnInit() {
    this.seo.initDefaultMetaInfomation()
  }
}

