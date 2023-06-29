import { Component, OnInit } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { authService } from "../../services/authService.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
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
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  url: string = window.location.href;
  data: any
  page: number = 1
  id: any
  term: any
  name: any
  film: any
  favoriteFilmIds
  totalRecords: number
  userFavorite
  type: any
  typeName: string
  login
  loader: boolean = true
  slug
  year: string
  category: any
  isSortAnime: boolean = false
  isSort: boolean = false
  sortField: string = "release_date"
  sortDirection: string = "desc"
  defaultImage = "../../assets/logo.png"
  nameTypeRu = {
    film: "Фильмы",
    serial: "Сериалы",
    anime: "Аниме",
    cartoon: "Мультфильмы"
  }

  selectedGenre: string = 'undefined'
  selectedCountry: string = 'undefined'
  selectedYear: string = 'undefined'

  country 
  countrySlug
  genres
  countries
  years
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: authService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })

    this.selectedCountry = this.route.snapshot.queryParams.country
    this.selectedYear = this.route.snapshot.queryParams.year 
    this.selectedGenre = this.route.snapshot.queryParams.genre
    this.countrySlug = this.route.snapshot.params.slug
    this.page = this.route.snapshot.queryParams.page
    if (!this.page) {
      this.page = 1
    }
    this.category = this.route.snapshot.url[0].path
    if (this.category === "anime") {
      this.isSortAnime = true
      this.isSort = false
    } else {
      this.isSort = true
    }

    this.id = this.route.snapshot.paramMap.get('id')
    this.type = this.route.snapshot.paramMap.get("type")
    this.typeName = this.nameTypeRu[this.type]
    var slug: string = this.route.snapshot.params.slug;
    this.slug = slug.split("-")
    this.id = this.slug.pop()
    let lsCountry = localStorage.getItem("countryList")
    if (lsCountry) {
      this.countries = JSON.parse(lsCountry)
      this.country = this.countries.filter(x => x.id == this.id)[0]
    }
    let ls = localStorage.getItem("years")
    if (ls) {
      this.years = JSON.parse(ls)
    }
    if (this.typeName === "Аниме") {
      this.getGenreAnime()
    } else {
      this.getGenre()
    }
    this.getCountryFilmsList(1)
    this.title.setTitle("Смотреть " + this.typeName + " " + this.country.title + " в хорошем качестве в 720p hd")
    this.updateMetaTagsGenre()
  }

  updateMetaTagsGenre() {
    this.meta.updateTag({ name: 'og:title', content: "Смотреть " + this.typeName + " " + this.country.title + " в хорошем качестве в 720p hd" });
    this.meta.updateTag({ name: 'og:description', content: "Смотреть " + this.typeName + " " + this.country.title + " в хорошем качестве в 720p hd" });
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'vk:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'og:site_name', content: 'IndigoFilms' });
  }

  getGenre() {
    let ls = localStorage.getItem("genres")
    if (ls) {
      this.genres = JSON.parse(ls)
    }
    else {
      this.api2Service.getGenre().subscribe((data) => {
        localStorage.setItem("genres", JSON.stringify(data.data))
        this.genres = data.data.items
      });
    }
  }

  getGenreAnime() {
    let ls = localStorage.getItem("genresAnime")
    if (ls) {
      this.genres = JSON.parse(ls)
    }
    else {
      this.api2Service.getGenre(1).subscribe((data) => {
        localStorage.setItem("genresAnime", JSON.stringify(data.data))
        this.genres = data.data
      });
    }
  }

  sortArrow(sortField) {
    let sortDirection = "desc"
    if (this.sortField === sortField) {
      sortDirection = this.sortDirection === "desc" ? "asc" : "desc"
    }
    this.sortField = sortField
    this.sortDirection = sortDirection
    this.getCountryFilmsList(1)
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


  getCountryFilmsList(page) {
    let selectedGenre = this.selectedGenre !== 'undefined' ? this.selectedGenre : '';
    let selectedCountry = this.selectedCountry !== 'undefined' ? this.selectedCountry : '';
    let selectedYear = this.selectedYear !== 'undefined' ? this.selectedYear : ''; 
    this.api2Service.getData(this.category, this.page, this.sortField, this.sortDirection, selectedGenre, this.id, selectedYear).subscribe((data) => {
      this.data = data.data.items
      this.spinner.hide();
      this.loader = false
      if (this.userFavorite && this.data) {
        this.data.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }
      this.totalRecords = data.data.pagination.total
    });

  }

  onFiltersChange() {
    this.onPageChange(1)
  }

  onPageChange(page) {
    this.page = page;

    let queryParams = {
      page: this.page
    };

    /* if (this.selectedCountry && this.selectedCountry != 'undefined') {
      queryParams["country"] = this.selectedCountry
    } */

     if (this.selectedYear && this.selectedYear != 'undefined') {
       queryParams["year"] = this.selectedYear
     } 

    if (this.selectedGenre && this.selectedGenre != 'undefined') {
      queryParams["genre"] = this.selectedGenre;
    }

    this.router.navigate(["/" + this.type + "/country/" + this.countrySlug], {
      relativeTo: this.route,
      queryParams: queryParams
    });

    this.getCountryFilmsList(1)
  }
}
