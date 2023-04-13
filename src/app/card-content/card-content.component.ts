import { Component, OnChanges, OnInit, SimpleChanges,Input,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { api } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import "@angular/common/locales/global/ru"
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";
import { Meta } from '@angular/platform-browser';

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
export class CardContentComponent implements OnInit{

  url: string = window.location.href;
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
  loader:boolean = true

  constructor(
    private api2Service: api2Service,
    private api: api,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private auth: authService,
    private dialog: MatDialog,
    private meta: Meta,
    private title: Title) {

  }
  ngOnInit() {
    this.spinner.show();
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
      debugger
      this.updateMetaTags()

      if (this.film.is_anime === true) {
        this.meta.addTag(
          { name: "description", content: this.film.title + this.film.original_title + "Аниме, Анимесериалы, Анимесериал, Смотреть Аниме онлайн, Аниме HD, совместный просмотр" })
      }

      if (this.film.is_serila === true) {
        this.meta.addTag(
          { name: "description", content: this.film.title + this.film.original_title + "Сериалы, сериал, Смотреть сериалы онлайн, сериалы HD, совместный просмотр" })
      }

    });
  }


  updateMetaTags() {
    this.meta.updateTag({ name: 'og:title', content: this.film.title });
    this.meta.updateTag({ name: 'og:description', content: this.film.overview });
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name:'og:site_name', content:'IndigoFilms' });
  }
}
