import { Component, OnInit } from '@angular/core';
import Swiper, { SwiperOptions, Pagination, Scrollbar, Navigation } from 'swiper';
import { Router } from '@angular/router';
import { api } from '../services/api.service';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {
  term: any;
  data: Array<any>
  totalRecords: any
  page: number = 1
  name: any
  log: any
  card: any
  public id: any
  public swiperConfig: SwiperOptions = {
    pagination: true,
  };

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10,
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

  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  constructor(
    private apiService: api,
    private api2Service: api2Service,  
    private router: Router, 
    private route: ActivatedRoute) {
    this.data = new Array<any>()

  }
  ngOnInit() {
    Swiper.use([Navigation]);
    this.getTopRated(1);
  }


  getTopRated(page) {
    this.api2Service.getData(page).subscribe((data) => {
      this.data = data.data.items
      this.totalRecords = data.data.pagination.per_page
    });
  }
  onSwiper(swiper) {

  }
  onSlideChange() {

  }
}


