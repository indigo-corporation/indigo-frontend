import { Component, OnInit } from '@angular/core';
import Swiper, { SwiperOptions, Pagination, Scrollbar, Navigation } from 'swiper';
import { Router } from '@angular/router';
import { api } from '../services/api.service';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { authService } from "../services/authService.service";


@Component({
  selector: 'app-more-films',
  templateUrl: './more-films.component.html',
  styleUrls: ['./more-films.component.scss']
})
export class MoreFilmsComponent implements OnInit {

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
  public swiperConfig: SwiperOptions = {
    pagination: true,
  };
  
  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 5,
    navigation: true,
    pagination: { clickable: false },
    scrollbar: { draggable: true },
    breakpoints: {
      992: {
        slidesPerView: 6,
      },
      764: {
        slidesPerView: 5,
      },
      300: {
        slidesPerView: 3,
      },
    }
  };

  constructor(
    private apiService: api,
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
    Swiper.use([Navigation]);
    this.getTopRated();
  }

  getTopRated() {
    this.api2Service.getFilmsMain().subscribe((data) => {
      this.data = data.data.new
      if (this.userFavorite && this.data) {
        this.data.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }
    });
  }
  onSwiper(swiper) {

  }
  onSlideChange() {
    
  }
}
