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

  country: any
  countrySlug
  genres
  countries
  years
  urlSite: string
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
    this.urlSite = "https://indigofilms.online"
    this.url = this.urlSite + this.route.snapshot["_routerState"].url
    this.id = this.route.snapshot.paramMap.get('id')
    this.type = this.route.snapshot.paramMap.get("type")
    this.typeName = this.nameTypeRu[this.type]
    var slug: string = this.route.snapshot.params.slug;
    this.slug = slug.split("-")
    this.id = this.slug.pop()

    let ls = localStorage.getItem("years")
    if (ls) {
      this.years = JSON.parse(ls)
    } else {
      this.years = this.getYearRange(2024, 1910);
      localStorage.setItem("years", JSON.stringify(this.years))
    }

    if (this.typeName === "Аниме") {
      this.getGenreAnime()
    } else {
      this.getGenre()
    }

    this.getCountryList()

    this.route.queryParams.subscribe(params => {

      if (params.sortDirection) {
        this.sortDirection = params.sortDirection
      }

      if (params.sortField) {
        this.sortField = params.sortField
      }

      if (this.selectedYear) {
        this.selectedYear = params.year
      }

      if (this.selectedGenre) {
        this.selectedGenre = params.genre;
      }
      this.getCountryFilmsList(1)
    });

    if (this.country && this.country.title) {
      this.title.setTitle("Смотреть " + this.typeName + " " + this.country.title + " в хорошем качестве в 720p hd")
      this.updateMetaTags()
    }
    this.changeCanonicalLinkPath(this.url);
  }

  changeCanonicalLinkPath(newPath: string) {
    const canonicalLink = this.document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', newPath);
    }
  }

  updateMetaTags() {
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
      this.genres.sort();
    } else {
      this.api2Service.getGenre().subscribe((data) => {
        this.genres = data.data.items
        this.genres.sort();
        localStorage.setItem("genres", JSON.stringify(this.genres))
      });
    }
  }

  getGenreAnime() {
    let ls = localStorage.getItem("genresAnime")
    if (ls) {
      this.genres = JSON.parse(ls)
      this.genres.sort();
    } else {
      this.api2Service.getGenre(1).subscribe((data) => {
        this.genres = data.data
        this.genres.sort();
        localStorage.setItem("genresAnime", JSON.stringify(this.genres))
      });
    }
  }
  getYearRange(startYear: number, endYear: number): { value: string; title: string; }[] {
    const years: { value: string; title: string; }[] = [];
    for (let year = startYear; year >= endYear; year--) {
      years.push({ value: year.toString(), title: year.toString() });
    }
    return years;
  }

  sortArrow(sortField) {
    let sortDirection = "desc"
    if (this.sortField === sortField) {
      sortDirection = this.sortDirection === "desc" ? "asc" : "desc"
    }
    this.sortField = sortField
    this.sortDirection = sortDirection

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        sortField: this.sortField,
        sortDirection: this.sortDirection
      },
      queryParamsHandling: 'merge', // Объединение существующих параметров
    });
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

  getCountryList() {
    let ls = localStorage.getItem("countryList")
    if (ls) {
      this.countries = JSON.parse(ls)
      this.countries.sort();
      this.country = this.countries.filter(x => x.id == this.id)[0]
    }
    else {
      this.api2Service.getCountryList().subscribe((data) => {
        localStorage.setItem("countryList", JSON.stringify(data.data))
        this.countries = data.data
        this.countries.sort();
        this.country = this.countries.filter(x => x.id == this.id)[0]
      })
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
    this.getCountryFilmsList(1)
  }

  onPageChange(page) {
    this.page = page;

    let queryParams = {
      page: this.page
    };

    if (this.sortField && this.sortField != 'undefined') {
      queryParams["sortField"] = this.sortField
    }

    if (this.sortDirection && this.sortDirection != 'undefined') {
      queryParams["sortDirection"] = this.sortDirection
    }

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
  }
}
