import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { authService } from "../services/authService.service";
import { NgxSpinnerService } from "ngx-spinner";
import { log } from 'console';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  animations: [

    trigger('enterAnimationArrow', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ]
    )
  ],
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewInit {

  isArrow1: boolean = false;
  isArrow2: boolean = false;
  isArrow3: boolean = false;
  category: any
  url: string = window.location.href;
  term: any;
  totalRecords: number
  page: number
  name: any
  log: any
  totalPages: any
  film: any
  type: any
  favoriteFilmIds
  isSortAnime: boolean = false
  isSort: boolean = false
  sortField: string = "release_date"
  sortDirection: string = "desc"
  cardContent: any;
  @Input() data: any

  public id: any
  login
  userFavorite


  typeName: string
  nameTypeRu = {
    film: "Фильмы",
    serial: "Сериалы",
    anime: "Аниме",
    cartoon: "Мультфильмы"
  }

  loader: boolean = true
  constructor(
    private api2Service: api2Service,
    private el: ElementRef,
    private auth: authService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.data = new Array<any>()

  }

  ngOnInit() {

    this.spinner.show();
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })

    this.page = this.route.snapshot.queryParams.page
    this.category = this.route.snapshot.url[0].path
    this.typeName = this.nameTypeRu[this.category]

    this.updateMetaTagsCategory()

    if (!this.page) {
      this.page = 1
    }
    if (this.category === "anime") {
      this.isSortAnime = true
      this.isSort = false
    } else {
      this.isSort = true
    }

    if (this.category === this.type) {
      this.title.setTitle("Смотреть Фильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Фильмы, Фильм, Смотреть фильмы онлайн, фильмы HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }

    if (this.category === "Cериалы") {
      this.title.setTitle("Смотреть Сериалы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Сериалы, сериал, Смотреть сериалы онлайн, сериалы HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }

    if (this.category === "Мультфильмы") {
      this.title.setTitle("Смотреть Мультфильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Мультфильмы, Мультфильмсериалы, Мультфильтсериал, Смотреть Мультфильмы онлайн, Мультфильмы HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }
    if (this.category === "Аниме") {
      this.title.setTitle("Смотреть Аниме в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Аниме, Анимесериалы, Анимесериал, Смотреть Аниме онлайн, Аниме HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }
    this.getData(1);
  }


  ngAfterViewInit() {

  }


  updateMetaTagsCategory() {
    this.meta.updateTag({ name: 'og:title', content: "Смотреть " + this.typeName + " " + " в хорошем качестве в 720p hd" });
    this.meta.updateTag({ name: 'og:description', content: "Смотреть " + this.typeName + " " + " в хорошем качестве в 720p hd, , индигофилмс, индиго филмс, indigofilms, indigo films" });
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name: 'og:site_name', content: 'IndigoFilms' });
  }


  getData(page) {
    this.api2Service.getData(this.category, this.page, this.sortField, this.sortDirection).subscribe((data) => {
      this.data = data.data.items
      this.data.forEach(item => {

        item.shiki_rating = item.shiki_rating !== "0.00" ? item.shiki_rating : null
      });
      this.loader = false
      this.spinner.hide();
      if(this.data && this.userFavorite) {
        this.data.forEach(item => {

          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }

      this.totalRecords = data.data.pagination.total
    });
  }

  filterUserFavorite(userFavorite) {
    if(userFavorite && this.data) {
      this.data.forEach(item => {
        item.isFavorite = userFavorite.includes(item.id);
      });
    }
  }


  onPageChange(page) {
    this.page = page
    this.router.navigate(["/" + this.category], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    });
    this.getData(page)
  }

  sortArrow(sortField) {
    let sortDirection = "desc"
    if (this.sortField === sortField) {
      sortDirection = this.sortDirection === "desc" ? "asc" : "desc"
    }
    this.sortField = sortField
    this.sortDirection = sortDirection
    this.getData(1)
  }

  arrowsUp(): void {
    const arrowElms = document.querySelectorAll(".arrow");
    if (arrowElms.length) {
      arrowElms.forEach((arrowElm) => {
        (arrowElm as HTMLElement).style.transform = "";
        (arrowElm as HTMLElement).style.color = "";
      });
    }
  }
} 
