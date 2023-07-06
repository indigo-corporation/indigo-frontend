import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { AlertifyService } from '../services/alertify.service';
import { NgxSpinnerService } from "ngx-spinner";
import { authService } from '../services/authService.service';
import { FormGroup, FormControl} from "@angular/forms"

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
    /*  this.router.routeReuseStrategy.shouldReuseRoute = function () {
       return false;
     };
     this.router.events.subscribe((evt) => {
       if (evt instanceof NavigationEnd) {
         this.router.navigated = false;
       }
     }); */
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


  onKeyPressEvent($event: any) {
    if ($event.target.value.length >= 2) {
      this.search($event.target.value, 1)
    }
  }

  search(term, page) {
    if (!term) {
      this.spinner.hide();
      this.loader = false
      return
    }
    if (term.length >= 2) {
      this.api2Service.search(term, this.page).subscribe((data) => {
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

  onPageChange(page) {
    this.page = page
    this.router.navigate(["/search-page"], {
      relativeTo: this.route,
      queryParams: {
        page: this.page,
        term: this.term
      }
    });
    this.search(this.term, this.page);
  }
}
