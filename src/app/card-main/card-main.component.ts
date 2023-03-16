import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core'
import Swiper, { SwiperOptions, Pagination, Scrollbar, Navigation } from 'swiper';
import SwiperCore, { EffectFade } from "swiper";
import { trigger, style, animate, transition } from '@angular/animations';
SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  animations: [
    trigger('enterAnimationPage', [
      transition(':enter', [
        style({ height: '0', opacity: '0', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '*', opacity: '1', overflow: 'hidden' }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '0', opacity: '0', overflow: 'hidden' }))
      ])
    ]
    )
  ],
  styleUrls: ['./card-main.component.scss']
})
export class CardMainComponent implements OnInit, OnChanges {
  
  public swiperConfig: SwiperOptions = {
    pagination: true,
  };
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 1,
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
  }

  onSwiper(swiper) {
  
  }
  onSlideChange() {
 
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
}
