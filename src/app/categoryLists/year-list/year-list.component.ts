import { Component, OnInit } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { authService } from "../../services/authService.service";
import { NgxSpinnerService } from "ngx-spinner";
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-year-list',
  templateUrl: './year-list.component.html',
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
  styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {
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
  year
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
  /*   selectedYear: string = 'undefined' */

  genres: any
  countries: any
  urlSite:string
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: authService,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) { }
  ngOnInit() {
    this.spinner.show();
    let lsCountry = localStorage.getItem("countryList")
    if (lsCountry) {
      this.countries = JSON.parse(lsCountry)
      this.countries.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    }

    this.selectedCountry = this.route.snapshot.queryParams.country
    /*  this.selectedYear = this.route.snapshot.queryParams.year */
    this.selectedGenre = this.route.snapshot.queryParams.genre

    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })
    this.urlSite = "https://indigofilms.online"
    this.url = this.urlSite  + this.route.snapshot["_routerState"].url
    this.year = this.route.snapshot.params.year
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

    if (this.typeName === "Аниме") {
      this.getGenreAnime()
      this.getCountryAnime()
    } else {
      this.getGenre()
      this.getCountryList()
    }
    this.getYearFilmsList(1)
    this.title.setTitle("Смотреть " + this.typeName + " " + this.year + " в хорошем качестве в 720p hd")
    this.updateMetaTagsYear()
    this.changeCanonicalLinkPath(this.url);
  }

  changeCanonicalLinkPath(newPath: string) {
    const canonicalLink = this.document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', newPath);
    }
  }

  updateMetaTagsYear() {
    this.meta.updateTag({ name: 'og:title', content: "Смотреть " + this.typeName + " " + this.year + " в хорошем качестве в 720p hd" });
    this.meta.updateTag({ name: 'og:description', content: "Смотреть " + this.typeName + " " + this.year + " в хорошем качестве в 720p hd" });
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'vk:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'og:site_name', content: 'IndigoFilms' });
  }

  sortArrow(sortField) {
    let sortDirection = "desc"
    if (this.sortField === sortField) {
      sortDirection = this.sortDirection === "desc" ? "asc" : "desc"
    }
    this.sortField = sortField
    this.sortDirection = sortDirection
    this.getYearFilmsList(1)
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

  onFiltersChange() {
    this.onPageChange(1)
  }


  getGenre() {
    let ls = localStorage.getItem("genres")
    if (ls) {
      this.genres = JSON.parse(ls)
      this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    } else {
      this.api2Service.getGenre().subscribe((data) => {
        this.genres = data.data.items
        this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
        localStorage.setItem("genres", JSON.stringify(this.genres))
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
        this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
        localStorage.setItem("genresAnime", JSON.stringify(this.genres))
      });
    }
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

  getYearFilmsList(page) {
    let selectedGenre = this.selectedGenre !== 'undefined' ? this.selectedGenre : '';
    let selectedCountry = this.selectedCountry !== 'undefined' ? this.selectedCountry : '';
    /* let selectedYear = this.selectedYear !== 'undefined' ? this.selectedYear : ''; */
    this.api2Service.getData(this.category, this.page, this.sortField, this.sortDirection, selectedGenre, selectedCountry, this.year).subscribe((data) => {
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

  onPageChange(page) {
    this.page = page;

    let queryParams = {
      page: this.page
    };

    if (this.selectedCountry && this.selectedCountry != 'undefined') {
      queryParams["country"] = this.selectedCountry
    }

    /*  if (this.selectedYear && this.selectedYear != 'undefined') {
       queryParams["year"] = this.selectedYear
     } */

    if (this.selectedGenre && this.selectedGenre != 'undefined') {
      queryParams["genre"] = this.selectedGenre;
    }

    this.router.navigate(["/" + this.type + "/year/" + this.year], {
      relativeTo: this.route,
      queryParams: queryParams
    });

    this.getYearFilmsList(page)
  }
}

