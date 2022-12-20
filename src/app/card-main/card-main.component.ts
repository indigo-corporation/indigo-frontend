import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core'
import Swiper, { SwiperOptions, Pagination, Scrollbar, Navigation } from 'swiper';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.scss']
})
export class CardMainComponent implements OnInit, OnChanges {
  term: any;
  totalRecords: any
  page: number = 1
  name: any
  log: any
  card: any
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
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 1,
      },
    }
  };
  nameType = {
    film: "Фильмы",
    serial: "Сериалы",
    anime: "Аниме",
    cartoon: "Мультфильмы"
  }
  @Input() data: any
  @Input() category: any
  public id: any
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    Swiper.use([Navigation]);
    console.log(this.nameType[this.category]);

  }

  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  onSwiper(swiper) {
    console.log(swiper)
  }
  onSlideChange() {
    console.log('slide change');
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
}
