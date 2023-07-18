import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { AlertifyService } from '../services/alertify.service';
import { NgxSpinnerService } from "ngx-spinner";
import { authService } from '../services/authService.service';
import { FormGroup, FormControl } from "@angular/forms"



@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  term: any
  totalRecords: number
  page: number = 1
  data: Array<any>
  name: any
  loader: boolean = true
  find: any
  user
  userFavorite
  url: string = window.location.href;
  defaultImage = "../../assets/logo.png"
  public id: any

  searhForm: FormGroup
  genres: any
  years: any
  countries: any

  isSortAnime: boolean = false
  isSort: boolean = false
  sortField: string = "release_date"
  sortDirection: string = "desc"

  typeName: string
  nameTypeRu = [
    {
      id:"film",
      title: "Фильмы"
    },
    {
      id:"serial",
      title:"Сериалы"
    },
    {
      id:"anime",
      title:"Аниме"
    },
    {
     
      id:"cartoon",
      title:"Мультфильмы"
    }
  ]
   

  selectedCategory: string = 'undefined'
  selectedCountry: string = 'undefined'
  selectedYear: string = 'undefined'
  selectedGenre: string = 'undefined'

  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private spinner: NgxSpinnerService,
    private title: Title,
    private auth: authService,
    private alertify: AlertifyService) {
    this.data = new Array<any>()
    this.searhForm = new FormGroup({
      term: new FormControl(""),
    })
  }

  

  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }
  ngOnInit() {
    this.spinner.show();
    this.auth.user$.subscribe(x => {
      this.user = x
      this.userFavorite = this.user ? this.user.favorite_film_ids : [];
    })

    this.selectedCountry = this.route.snapshot.queryParams.country
    this.selectedYear = this.route.snapshot.queryParams.year
    this.selectedGenre = this.route.snapshot.queryParams.genre
    this.selectedCategory = this.route.snapshot.queryParams.category
    debugger
    
    let ls = localStorage.getItem("years")
    if (ls) {
      this.years = JSON.parse(ls)
    } else {
      this.years = this.getYearRange(2023, 1910);
      localStorage.setItem("years", JSON.stringify(this.years))
    }
    this.page = this.route.snapshot.queryParams.page
    if (!this.page) {
      this.page = 1
    }
    this.route.queryParams.subscribe((queryParams: any) => {
      this.page = queryParams.page;
      if (this.term) {
        this.term = queryParams.term;
      }
      this.search(this.term, this.page)
    });
    this.term = this.route.snapshot.queryParams.term

    if (this.selectedCategory === "anime") {
      this.getGenreAnime()
      this.getCountryAnime()
    } else {
      this.getGenre()
      this.getCountryList()
    }

    if (this.selectedCategory === "anime") {
      this.isSortAnime = true
      this.isSort = false
    } else {
      this.isSort = true
    }
    this.search(this.term, this.page)
    this.title.setTitle("Поиск" + " " + this.term)
    this.updateMetaTags()
  }



  updateMetaTags() {
    this.meta.updateTag({ name: 'og:title', content: 'Поиск' + " " + this.term });
    this.meta.updateTag({ name: 'og:description', content: 'Поиск' + " " + this.term });
    this.meta.updateTag({ name: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'vk:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name: 'og:site_name', content: 'IndigoFilms' });
  }

  getData(page) {
    this.api2Service.getData(page).subscribe((data) => {
      this.data = data.data.items
      this.totalRecords = data.data.pagination.total
    });
  }

  onFiltersChange() {
    this.onPageChange(1)
  }

  onKeyPressEvent($event: any) {
    if ($event.target.value.length >= 2) {
      this.search($event.target.value, 1)
    }
  }

  search(term, page) {
    let selectedGenre = this.selectedGenre !== 'undefined' ? this.selectedGenre : '';
    let selectedCountry = this.selectedCountry !== 'undefined' ? this.selectedCountry : '';
    let selectedYear = this.selectedYear !== 'undefined' ? this.selectedYear : '';
    let selectedCategory = this.selectedCategory !== 'undefined' ? this.selectedCategory : '';
    if (!term) {
      this.spinner.hide();
      this.loader = false
      return
    }
    debugger
    if (term.length >= 2) {
      this.api2Service.search( term, page, selectedCategory, selectedGenre, selectedCountry, selectedYear).subscribe((data) => {
        this.data = data.data.items
        this.spinner.hide();
        this.loader = false
        if (this.userFavorite && this.data) {
          this.data.forEach(item => {
            item.isFavorite = this.userFavorite.includes(item.id);
          });
        }
        this.totalRecords = data.data.pagination.total
      })
    }

  }


  getCountryList() {
    let ls = localStorage.getItem("countryList")
    if (ls) {
      this.countries = JSON.parse(ls)
      this.countries.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    }
    else {
      this.api2Service.getCountryList().subscribe((data) => {
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
      this.api2Service.getCountryList().subscribe((data) => {
        this.countries = data.data
        this.countries = this.countries.filter(x => x.id === 45 || x.id === 110)
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


  getGenre() {
    let ls = localStorage.getItem("genres")
    if (ls) {
      this.genres = JSON.parse(ls)
      this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    } else {
      this.api2Service.getGenre().subscribe((data) => {
        this.genres = data.data.items
        if (this.genres) {
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
        if (this.genres) {
          this.genres.sort((a, b) => a.title.localeCompare(b.title, "ru"));
          localStorage.setItem("genresAnime", JSON.stringify(this.genres))
        }
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

    if (this.selectedCategory && this.selectedCategory != 'undefined') {
      queryParams["category"] = this.selectedCategory;
    }

    if (this.term && this.term != 'undefined') {
      queryParams["term"] = this.term;
    }
  
    this.router.navigate(["/search-page"], {
      relativeTo: this.route,
      queryParams: queryParams
    });

    this.search(this.term, this.page);
  }

}
