import { Component, OnChanges, OnInit, SimpleChanges,Input } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { api } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import "@angular/common/locales/global/ru"
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';

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

  url: string = window.location.href;
  public id: any
  term: any;
  @Input() film: any
  totalRecords: string
  login: any
  slug
  isTogther: boolean = true
  isFilm: boolean = true
  constructor(
    private api2Service: api2Service,
    private api: api,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private auth: authService,
    private dialog: MatDialog,
    private meta: Meta,
    private title: Title) {

  }
  ngOnInit() {
    var slug: string = this.route.snapshot.params.id;
    this.slug = slug.split("-")
    this.id = this.slug.pop()
    this.getfind(this.id);
    this.auth.user$.subscribe(x => {
      this.login = x != null
    })
  }
  

 
  getfind(id) {
    this.api2Service.getfind(id).subscribe((data) => {
      this.film = data.data;
      let imdbID = this.film.imdb_id;
      this.title.setTitle("Смотреть" + " " + this.film.title + " " + "онлайн бесплатно в хорошем качестве")
      this.meta.addTags([
        { property: 'og:title', content: this.film.title },
        { property: 'og:description', content: this.film.overview },
        { property: 'og:image', content: this.film.poster },
        { property: 'og:url', content: this.url}
      ]);
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
}
