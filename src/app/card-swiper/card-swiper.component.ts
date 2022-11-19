import { Component, OnInit } from '@angular/core';
import Swiper, { SwiperOptions, Pagination, Scrollbar, Navigation} from 'swiper';
import { Router } from '@angular/router';
import { api } from '../services/api.service';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core'
@Component({
  selector: 'app-card-swiper',
  templateUrl: './card-swiper.component.html',
  styleUrls: ['./card-swiper.component.scss']
})
export class CardSwiperComponent implements OnInit {
  term: any;
  totalRecords: any
  page: number = 1
  name: any
  log:any
  film:any
  card:any
  @Input() data : any
  public id: any
  public swiperConfig: SwiperOptions = {
    pagination: true,
  };
  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: true,
    pagination: { clickable: false },
    scrollbar: { draggable: true },
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
      764: {
        slidesPerView: 1,
      },
      300: {
        slidesPerView: 1,
      },
    }
  };
  constructor(
    private apiService: api,
    private api2Service : api2Service ,
    private router: Router, 
    private route: ActivatedRoute) { 
      this.data = new Array<any>()
  }
  
  ngOnInit() {  
    Swiper.use ([Navigation]);
    console.log(this.film);
    
  }
  onSwiper(swiper) {
    console.log(swiper)
  }
  onSlideChange() {
    console.log('slide change');
  }
}
