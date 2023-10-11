import { Component, OnChanges, OnInit, SimpleChanges, Input, AfterViewInit } from '@angular/core';
import { Router, RouterState } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { api } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import "@angular/common/locales/global/ru"
import { authService } from "../services/authService.service";
import { Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  animations: [
    trigger('enterAnimation', [
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
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit {

  url: string 
  public id: any
  term: any;
  @Input() film: any
  userFavorite
  totalRecords: string
  login: any
  slug
  favoriteFilmIds
  isTogther: boolean = true
  isFilm: boolean = true
  loader: boolean = true

  typeName: string
  nameTypeRu = {
    film: "Фильм",
    serial: "Сериал",
    anime: "Аниме",
    cartoon: "Мультфильм"
  }
  category:string
  urlSite:string
  constructor(
    private api2Service: api2Service,
    private api: api,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    @Inject(DOCUMENT) private document: Document,
    private auth: authService,
    private dialog: MatDialog,
    private meta: Meta,
    private title: Title) {

  }
  ngOnInit() {
    this.spinner.show();
    this.category = this.route.snapshot.url[0].path
    this.typeName = this.nameTypeRu[this.category]
    this.urlSite = "https://indigofilms.online"
    this.url = this.urlSite  + this.route.snapshot["_routerState"].url
    var slug: string = this.route.snapshot.params.id;
    this.slug = slug.split("-")
    this.id = this.slug.pop()
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })
    this.getfind(this.id);
    this.changeCanonicalLinkPath(this.url);
  }


  changeCanonicalLinkPath(newPath: string) {
    const canonicalLink = this.document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', newPath);
    }
  }

  getfind(id) {
    this.api2Service.getfind(id).subscribe((data) => {
      this.film = data.data;
      this.loader = false
      this.spinner.hide();

      if (this.userFavorite && this.film) {
        if (this.film && this.userFavorite.includes(this.film.id)) {
          this.film.isFavorite = true
        } else {
          this.film.isFavorite = false
        }
      }

      this.title.setTitle("Смотреть" + " " + this.film.title + " " + "онлайн бесплатно в хорошем качестве")
      this.updateMetaTags()
    });
  }


  updateMetaTags() {
    if(this.film.id === 5413) {
      this.title.setTitle("Смотреть" + " " + this.film.title + " " + "8 сезон 3 серия" + " " + "онлайн бесплатно в хорошем качестве")
      this.meta.updateTag({ name: 'og:title', content: this.film.title + "8 сезон 3 серия" });
      this.meta.updateTag({ name: "description", content: "Смотреть" + " " +  this.typeName + "8 сезон 3 серия" + " " + this.film.title + " " + "онлайн в хорошем качестве совершенно бесплатно и без регистрации! Приятного просмотра!" });
    } else {
      this.meta.updateTag({ name: "description", content: "Смотреть" + " " +  this.typeName + " " + this.film.title + " " + "онлайн в хорошем качестве совершенно бесплатно и без регистрации! Приятного просмотра!" });
    }
    this.meta.updateTag({ name:"keywords", content: this.film.title + " " + this.film.original_title + " " + "indigofilms" });
    this.meta.updateTag({ name: 'og:title', content: this.film.title });
    this.meta.updateTag({ name: 'og:description', content: this.film.overview });
    this.meta.updateTag({ name: 'og:image', content: this.film.poster });
    this.meta.updateTag({ name: 'vk:image', content: this.film.poster });
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name: 'og:site_name', content: 'IndigoFilms' });
  }
}
