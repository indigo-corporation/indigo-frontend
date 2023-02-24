import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-card-discription',
  animations: [
    trigger(
      'enterAnimationText', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
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
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  @Input() category: any
  @Input() stars: any
  raitingControl = new FormControl(0)
  rating3: number;
  constructor(
    private api2Service: api2Service,
    private router: Router,
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

  ngOnInit() {
    this.auth.user$.subscribe(x => {
      this.login = x != null
    })
    if (this.login) {
      this.getFavoriteArray();
    }
    this.category = this.route.snapshot.params.category
  }

  checkIfFavoriteFilm() {
    if (this.film) {
      if (this.favoriteFilmIds && this.favoriteFilmIds.includes(this.film.id)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    }

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.film && changes.film.currentValue) {
      this.checkIfFavoriteFilm();
    }
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
    })

  }

  getFavoriteArray() {
    this.api2Service.getFavoriteArray().subscribe((data) => {
      this.favoriteFilmIds = data.data
      this.checkIfFavoriteFilm()
    })
  }
  /* 
      let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
       if (favoriteFilmIds) {
         favoriteFilmIds = JSON.parse(favoriteFilmIds)
         return favoriteFilmIds
       } else { 
       this.api2Service.getFavoriteArray().subscribe((data) => {
        this.favoriteFilmIds = data.data
        debugger
         localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds))
        return favoriteFilmIds 
        }) 
      }) */

  postFavorite() {
    if (!this.login) {
      this.openLogin()
      return
    }
    this.api2Service.postFavorite(this.film.id).subscribe((data) => {
      this.favoriteFilmIds.push(this.film.id)
      this.isFavorite = true
      /* localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds)) */
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
      if (this.favoriteFilmIds = this.favoriteFilmIds.filter(x => x.id != this.film.id)) {
        this.isFavorite = false
      }
      /*  localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds)) */
    })
  }
}
