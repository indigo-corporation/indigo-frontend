import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Input } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { trigger, style, animate, transition } from '@angular/animations';
import { api2Service } from '../services/api2.service';
import { IpService } from '../services/ip.service';

declare var Playerjs: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
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
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @Input() film: any
  @Output() filmPost = new EventEmitter<string>();
  imdb_id
  isPlayerKodic: boolean = true
  isPlayerSveta: boolean = false
  srcPlayer: any
  asvPlayer
  isHiddenCdn: boolean = false
  isHiddenKodic: boolean = false
  isHiddenUa: boolean = false
  isHiddenIndigo: boolean = false
  isIndigo: boolean = true
  data

  blockFilms = [
    {
      filmId: 82595
    },
    {
      filmId: 22836
    },
    {
      filmId: 78226
    },
    {
      filmId: 82024
    }
  ]

  country
  isRussia: boolean = false
  isOther: boolean = true
  indigoplayer
  ashdiUrl: string
  active1: boolean = true
  active2: boolean = true
  active3: boolean = true
  currentPlayer: string = '';
  public safeSrc: SafeResourceUrl;
  constructor(
    private api2: api2Service,
    private ipService: IpService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (this.film.has_player === true) {
      this.api2.getIndigoPlayer().subscribe((data) => {
        this.indigoplayer = data.data
        new Playerjs({ id: 'player', file: this.indigoplayer });
      })
      this.onPlayer('indigo');

    } else {
      if (!this.film.shiki_id) {
        this.onPlayer('cdn');
        this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id=" + this.film.imdb_id + "&domain=indigofilms.online");
      }
      this.isIndigo = false
      this.isHiddenIndigo = true
    }


    let ashdiUrl = 'https://base.ashdi.vip/api/product/read_one.php?imdb=' + this.film.imdb_id + '&api_key=99a660-8378e4-4adb0a-eeeb92-86b677';
    this.http.get<any>(ashdiUrl).subscribe(
      data => this.ashdiUrl = data.url,
      err => this.isHiddenUa = true,
    );

    if (this.film.shiki_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID=" + this.film.shiki_id);
    } else {
      let kodiciUrl = "https://kodikapi.com/search?token=c93d194dd1a2f6cc95b3095a9940dfb2&imdb_id=" + this.film.imdb_id;
      this.http.get<any>(kodiciUrl).subscribe((data) => {
        if (!data.total) {
          this.isHiddenKodic = true
        }
      });
    }

    if (!this.film.shiki_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id=" + this.film.imdb_id + "&domain=indigofilms.online");
    }
    if (!this.film.imdb_id) {
      this.isHiddenCdn = true
    }
  }

  ngAfterViewInit(): void {
    this.ipService.getIpAddress().subscribe((data) => {
      this.country = data.country;
      const filmIds = this.blockFilms.map(item => item.filmId);
      if (this.country === 'RU' && filmIds.includes(this.film.id)) {
        this.isRussia = true
        this.isOther = false
      }
    })
  }


  onPlayer(player: string) {
    this.currentPlayer = player;
    if (player === 'kodic' && this.film.shiki_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID=" + this.film.shiki_id);
    } else {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?imdbID=" + this.film.imdb_id);
    }

    if (player === 'cdn' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id=" + this.film.imdb_id);
    }

    if (player === 'ASHDI' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl(this.ashdiUrl)
    }

    if (player === 'indigo') {
      this.api2.getIndigoPlayer().subscribe((data) => {
        this.indigoplayer = data.data
        new Playerjs({ id: 'player', file: this.indigoplayer });
      })
      this.srcPlayer = null
      // Ваш код для обновления вашего собственного плеера
    }
  }
}