import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { authService } from "../services/authService.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
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
    ),
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
export class CardsComponent implements OnInit {

  isArrow1: boolean = false;
  isArrow2: boolean = false;
  isArrow3: boolean = false;
  category: any
  term: any;
  totalRecords: number
  page: number
  name: any
  log: any
  totalPages:any
  film: any
  favoriteFilmIds
  isSortAnime:boolean =false
  isSort:boolean = false
  sortField:string = "release_date"
  sortDirection:string ="desc"
  @Input() data: any
  public id: any
  login
  userFavorite

  loader:boolean = true
  constructor(
    private api2Service: api2Service,
    private el:ElementRef,
    private auth: authService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) {
    this.data = new Array<any>()

  }



  ngOnInit() {
    this.loader=true
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
       this.userFavorite = user.favorite_film_ids
      }
    })
    this.page=this.route.snapshot.queryParams.page
    if(!this.page) {
      this.page = 1 
    }
    this.category = this.route.snapshot.url[0].path
      if (this.category === "anime") {
        this.isSortAnime = true
        this.isSort = false
      } else {
        this.isSort = true
      }
    if (this.category === "film") {
      this.title.setTitle("Смотреть Фильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Фильмы, Фильм, Смотреть фильмы онлайн, фильмы HD, совместный просмотр" })
    }

    if (this.category === "serial") {
      this.title.setTitle("Смотреть Сериалы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Сериалы, сериал, Смотреть сериалы онлайн, сериалы HD, совместный просмотр" })
    }

    if (this.category === "cartoon") {
      this.title.setTitle("Смотреть Мультфильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Мультфильмы, Мультфильмсериалы, Мультфильтсериал, Смотреть Мультфильмы онлайн, Мультфильмы HD, совместный просмотр" })
    }

    if (this.category === "anime") {
      this.title.setTitle("Смотреть Аниме в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Аниме, Анимесериалы, Анимесериал, Смотреть Аниме онлайн, Аниме HD, совместный просмотр" })
    }
    this.getData(1);
  }
  getData(page) {
    this.api2Service.getData(this.category, this.page, this.sortField, this.sortDirection).subscribe((data) => {
      this.data = data.data.items
      this.loader = false
      this.data.forEach(item => {
        item.isFavorite = this.userFavorite.includes(item.id);
      });
      this.totalRecords = data.data.pagination.total
      this.totalPages = data.data.pagination.total_pages
    });
  }

  filterUserFavorite(userFavorite) {
    if(userFavorite) {
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

  genreArrow(sortField) {
    let sortDirection = "desc"
    if(this.sortField === sortField) {
      sortDirection = this.sortDirection === "desc" ? "asc" : "desc"
    } 
    this.sortField = sortField
    this.sortDirection = sortDirection
    this.getData(1)
  }

  arrowsUp(): void {
    const arrowElms = document.querySelectorAll(".arrow");
    arrowElms.forEach((arrowElm) => {
      (arrowElm as HTMLElement).style.transform = "";
      (arrowElm as HTMLElement).style.color = "";
    });
  }
} 
