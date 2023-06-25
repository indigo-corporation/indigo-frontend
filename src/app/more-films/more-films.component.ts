import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { authService } from "../services/authService.service";


@Component({
  selector: 'app-more-films',
  templateUrl: './more-films.component.html',
  styleUrls: ['./more-films.component.scss']
})
export class MoreFilmsComponent implements OnInit {
  @Input() filmId: any
  term: any;
  data: Array<any>
  totalRecords: any
  page: number = 1
  name: any
  log: any
  category
  card: any

  login
  userFavorite
  public id: any
  

  constructor(
    private api2Service: api2Service,  
    private auth: authService,
    private router: Router, 
    private route: ActivatedRoute) {
    this.data = new Array<any>()

  }
  ngOnInit() {
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })
    this.category = this.route.snapshot.url[0].path
    this.getRecommendations();
  }

  getRecommendations() {
    this.api2Service.getRecommendations(this.filmId).subscribe((data) => {
      this.data = data.data
      debugger
      if (this.userFavorite && this.data) {
        this.data.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }
    });
  }
}
