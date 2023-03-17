import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewChecked, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import "@angular/common/locales/global/ru"
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { DecimalPipe, formatNumber } from '@angular/common';
import { hasClassName } from '@ng-bootstrap/ng-bootstrap/util/util';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Meta } from '@angular/platform-browser';

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
export class CardDiscriptionComponent implements OnInit {
  term: any;
  totalRecords: any
  isFavorite: boolean = false
  name: any
  favorite: []
  log: any
  isPlayer: boolean = false
  favoriteFilmIds: any
  login: any
  film_id: number
  public safeSrc: SafeResourceUrl;
  @Input() film: any
  @Output() isRaited = new EventEmitter<boolean>();
  @Output() isWatchSub = new EventEmitter<boolean>();
  public id: any
  public form: FormGroup;
  isPlayerKodic: boolean = true
  isPlayerSveta: boolean = false
  textView: boolean = false
  srcKodic: any
  srcSveta: any
  raiting: any
  genres
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  @Input() category: any
  @Input() stars: any
  raitingControl = new FormControl(0)
  rating3: number;
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private meta: Meta,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private auth: authService,
    private modalService: MdbModalService,
    private el: ElementRef) {
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

  url: string = window.location.href;

  ngOnInit() {
    window.location.href
    this.auth.user$.subscribe(x => {
      this.login = x != null
    })
   
    this.category = this.route.snapshot.params.category
  }

  getfind(id) {
    this.api2Service.getfind(id).subscribe((data) => {
      this.genres = data;
    });
  }






  telegramUrl: string = "https://t.me/share/url?url=";
  facebookUrl: string = "https://www.facebook.com/sharer/sharer.php?u=";

  shareOnTelegram() {
    let currentUrl = window.location.href;
    let url = this.telegramUrl + encodeURIComponent(currentUrl);
    window.open(url, "_blank");
  }
  currentUrl
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
    let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
    
    this.api2Service.postFavorite(this.film.id).subscribe((data) => {
      if(favoriteFilmIds) {
        favoriteFilmIds = JSON.parse(favoriteFilmIds)
      favoriteFilmIds.push(this.film.id)
      localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds))
      }
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
    let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
    this.api2Service.removeFavorite(this.film.id).subscribe((data) => {
      if(favoriteFilmIds){
        favoriteFilmIds = JSON.parse(favoriteFilmIds)
        favoriteFilmIds = favoriteFilmIds.filter(x => x != this.film.id)
        localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds)) 
      }
      this.film.isFavorite = false   
    })
  }
}
