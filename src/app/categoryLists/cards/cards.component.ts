import { Component, OnInit, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { authService } from "../../services/authService.service";
import { NgxSpinnerService } from "ngx-spinner";
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';


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
export class CardsComponent implements OnInit {

  isArrow1: boolean = false;
  isArrow2: boolean = false;
  isArrow3: boolean = false;
  category: any
  url: string
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
  defaultImage = "../../assets/logo.png"

  typeName: string
  nameTypeRu = {
    film: "Фильмы",
    serial: "Сериалы",
    anime: "Аниме",
    cartoon: "Мультфильмы"
  }

  countries : any

  selectedCountry: string = 'undefined'
  selectedYear: string = 'undefined'
  selectedGenre: string = 'undefined'

  years: any[];
  yearObject: any
  genreAnime
  genres
  year: string
  genre: string
  country: string
  loader: boolean = true
  urlSite:string
  constructor(
    private api2Service: api2Service,
    private el: ElementRef,
    private auth: authService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.data = new Array<any>()
  }

  ngOnInit() {
    let ls = localStorage.getItem("years")
    if (ls) {
      this.years = JSON.parse(ls)
    } else {
      this.years = this.getYearRange(2023,1910);
      localStorage.setItem("years", JSON.stringify(this.years))
    }
    this.urlSite = "https://indigofilms.online"
    this.url = this.urlSite  + this.route.snapshot["_routerState"].url
    
    this.spinner.show();
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })

    this.page = this.route.snapshot.queryParams.page
    this.selectedCountry = this.route.snapshot.queryParams.country
    this.selectedYear = this.route.snapshot.queryParams.year
    this.selectedGenre = this.route.snapshot.queryParams.genre

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

    if (this.typeName === "Аниме") {
      this.getGenreAnime()
      this.getCountryAnime()
    } else {
      this.getGenre()
      this.getCountryList()
    }


    if (this.category === "film") {
      this.title.setTitle("Смотреть Фильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Фильмы, Фильм, Смотреть фильмы онлайн, фильмы HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }

    if (this.category === "serial") {
      this.title.setTitle("Смотреть Сериалы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Сериалы, сериал, Смотреть сериалы онлайн, сериалы HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }

    if (this.category === "cartoon") {
      this.title.setTitle("Смотреть Мультфильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Мультфильмы, Мультфильмсериалы, Мультфильтсериал, Смотреть Мультфильмы онлайн, Мультфильмы HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }
    if (this.category === "anime") {
      this.title.setTitle("Смотреть Аниме в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Аниме, Анимесериалы, Анимесериал, Смотреть Аниме онлайн, Аниме HD, совместный просмотр, индигофилмс, индиго филмс, indigofilms, indigo films" })
    }
    this.route.queryParams.subscribe(params => {
      if (this.selectedCountry) {
         this.selectedCountry = params.country 
      }
    
      if (this.selectedYear) {
        this.selectedYear = params.year 
      }
    
      if (this.selectedGenre) {
        this.selectedGenre = params.genre ;
      }
      this.getData(1);
    });
    
    this.changeCanonicalLinkPath(this.url);
  }


  getGenre() {
    let ls = localStorage.getItem("genres")
    if (ls) {
      this.genres = JSON.parse(ls)
      this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    } else {
      this.api2Service.getGenre().subscribe((data) => {
        this.genres = data.data.items
        if(this.genres) {
          this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
          localStorage.setItem("genres", JSON.stringify(this.genres))
        }
      });
    }
  }

  getGenreAnime() {
    let ls = localStorage.getItem("genresAnime")
    if (ls) {
      this.genres = JSON.parse(ls)
      this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    } else {
      this.api2Service.getGenre(1).subscribe((data) => {
        this.genres = data.data
        if(this.genres) {
          this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
          localStorage.setItem("genresAnime", JSON.stringify(this.genres))
        }
      });
    }
  }

  onFiltersChange() {
    this.onPageChange(1)
  }

  changeCanonicalLinkPath(newPath: string) {
    const canonicalLink = this.document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', newPath);
    }
  }


  updateMetaTagsCategory() {
    this.meta.updateTag({ name: 'og:title', content: "Смотреть " + this.typeName + " " + "в хорошем качестве в 720p hd" });
    this.meta.updateTag({ name: 'og:description', content: "Смотреть " + this.typeName + " " + "в хорошем качестве в 720p hd, индигофилмс, индиго филмс, indigofilms, indigo films" });
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'vk:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'og:site_name', content: 'IndigoFilms' });
  }


  getData(page) {
    let selectedGenre = this.selectedGenre !== 'undefined' ? this.selectedGenre : '';
    let selectedCountry = this.selectedCountry !== 'undefined' ? this.selectedCountry : '';
    let selectedYear = this.selectedYear !== 'undefined' ? this.selectedYear : '';

    this.api2Service.getData(this.category, this.page, this.sortField, this.sortDirection, selectedGenre, selectedCountry, selectedYear).subscribe((data) => {
      this.data = data.data.items
      this.data.forEach(item => {
        item.shiki_rating = item.shiki_rating !== "0.00" ? item.shiki_rating : null
      });
      this.loader = false
      this.spinner.hide();
      if (this.data && this.userFavorite) {
        this.data.forEach(item => {

          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }
      this.totalRecords = data.data.pagination.total
    });
  }

  getCountryList() {
    let ls = localStorage.getItem("countryList")
    if (ls) {
      this.countries = JSON.parse(ls)
      this.countries.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    }
    else {
      this.api2Service.getCountryList().subscribe((data)=> {
        localStorage.setItem("countryList", JSON.stringify(data.data))
        this.countries = data.data
        this.countries.sort((a, b) => a.title.localeCompare(b.title, "ru"));
      })
    }
  }

  getCountryAnime() {
    let ls = localStorage.getItem("countryAnime")
    if (ls) {
      this.countries = JSON.parse(ls)
    } else {
      this.api2Service.getCountryList().subscribe((data)=> {
        this.countries = data.data
        this.countries = this.countries.filter(x=>x.id === 45 || x.id === 110)
        localStorage.setItem("countryAnime", JSON.stringify(this.countries))
      })
    }
  }


  getYearRange(startYear: number, endYear: number): { value: string; title: string; }[] {
    const years: { value: string; title: string; }[] = [];
    for (let year = startYear; year >= endYear; year--) {
      years.push({ value: year.toString(), title: year.toString() });
    }
    return years;
  }

  filterUserFavorite(userFavorite) {
    if (userFavorite && this.data) {
      this.data.forEach(item => {
        item.isFavorite = userFavorite.includes(item.id);
      });
    }
  }

  onPageChange(page) {
    this.page = page;

    let queryParams = {
      page: this.page
    };

    if (this.selectedCountry && this.selectedCountry != 'undefined') {
      queryParams["country"] = this.selectedCountry
    }

    if (this.selectedYear && this.selectedYear != 'undefined') {
      queryParams["year"] = this.selectedYear
    }

    if (this.selectedGenre && this.selectedGenre != 'undefined') {
      queryParams["genre"] = this.selectedGenre;
    }
  
    this.router.navigate(["/" + this.category], {
      relativeTo: this.route,
      queryParams: queryParams
    });

    this.getData(page);
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
