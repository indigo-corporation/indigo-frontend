import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import "@angular/common/locales/global/ru"
import { SafeResourceUrl } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms"
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card-discription',
  animations: [
    trigger(
      'enterAnimationText', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 }))
      ]),
    ]
    ),
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
  templateUrl: './card-discription.component.html',
  styleUrls: ['./card-discription.component.scss']
})

export class CardDiscriptionComponent implements OnInit, AfterViewInit {

  term: any;
  totalRecords: any
  name: any
  favorite: []
  log: any
  favoriteFilmIds: any
  login: any
  film_id: number

  public safeSrc: SafeResourceUrl;

  @Input() category: any
  @Input() stars: any
  @Input() film: any

  @Output() isRaited = new EventEmitter<boolean>();
  @Output() isWatchSub = new EventEmitter<boolean>();

  public id: any
  public form: FormGroup;

  textView: boolean = false
  isPlayer: boolean = false
  isFavorite: boolean = false
  isPlayerKodic: boolean = true
  isPlayerSveta: boolean = false
  isFilmOverview: boolean = true
 
  telegramUrl: string = "https://t.me/share/url?url=";
  facebookUrl: string = "https://www.facebook.com/sharer/sharer.php?u=";
  
  url: string = window.location.href;
  userFavorite
 
  srcKodic: any
  srcSveta: any
  raiting: any
  genres
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  raitingControl = new FormControl(0)
  rating3: number;
  currentUrl

  constructor(
    private api2Service: api2Service,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: authService,
    private modalService: MdbModalService,
    private el: ElementRef) 
    {
    this.rating3 = 0;

    this.form = this.fb.group({
    });
  }

  nameType = {
    film: "Фильм",
    serial: "Сериал",
    anime: "Аниме",
    cartoon: "Мультфильм"
  }


  ngOnInit() {
    window.location.href
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
       this.userFavorite = user.favorite_film_ids
      }
    }) 
   
    this.category = this.route.snapshot.params.category
  }

  ngAfterViewInit() {
    this.checkOverviewLength();
  }

  checkOverviewLength() {
    if (!this.film.overview) {
      this.isFilmOverview = false
    }
    if (this.film.overview.length > 300) {
      
      this.isFilmOverview = true
    } else {
      this.isFilmOverview = false
    }
  }

  getfind(id) {
    this.api2Service.getfind(id).subscribe((data) => {
      this.genres = data;
    });
  }

  shareOnTelegram() {
    let currentUrl = window.location.href;
    let url = this.telegramUrl + encodeURIComponent(currentUrl);
    window.open(url, "_blank");
  }

  shareOnFacebook() {
    this.currentUrl = window.location.href;
    let url = this.facebookUrl + encodeURIComponent(this.currentUrl);
    window.open(url, "_blank");
  }


  moreText() {
    this.textView = true
  }

  backText() {
    this.textView = false

  }

  postStars() {
    if (!this.login) {
      this.openLogin()
      return
    }
    this.api2Service.postStars(this.film.id, this.raitingControl.value).subscribe((data) => {
      this.film.stars = data.data
      this.film.stars = parseFloat(data.data);
    })

  }


  postFavorite() {
    if (!this.login) {
      this.openLogin()
      return
    }
    this.api2Service.postFavorite(this.film.id).subscribe((data) => {
      this.userFavorite.push(this.film.id)
      this.film.isFavorite = true
    })
  }

  openLogin() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {
    });
  }

  change(change: boolean) {
    this.isWatchSub.next(change)
  }

  removeFavorite() {
    this.api2Service.removeFavorite(this.film.id).subscribe((data) => {
      if(this.userFavorite){
        this.userFavorite = this.userFavorite.filter(x => x != this.film.id)
      }
      this.film.isFavorite = false   
    })
  }
}
