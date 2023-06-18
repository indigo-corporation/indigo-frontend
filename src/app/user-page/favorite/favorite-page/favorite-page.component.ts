import { Component, OnInit, Input,Output,EventEmitter,HostListener } from '@angular/core';
import { api2Service } from '../../../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { authService } from '../../../services/authService.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {
  favoriteFilms: any
  term: any;
  totalRecords: number
  totalPages: number
  page: number
  userFavorite
  cardId 
  user
  userString
  loader:boolean = true
  @Output() filterUserFavorite = new EventEmitter<any>();
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private meta: Meta,
    private auth: authService,
    private title: Title
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.page=this.route.snapshot.queryParams.page
    if(!this.page) {
      this.page = 1 
    }
    this.title.setTitle("Избранные")
  
    this.auth.user$.subscribe(x => {
      this.user = x
      this.userFavorite = this.user ? this.user.favorite_film_ids : [];
    })
    this.getFavoriteFilms()
  }

  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  filterCard(cardId) {
    this.cardId = cardId
    this.favoriteFilms = this.favoriteFilms.filter(x => x.id !== cardId);
  }

  pushCard(cardId) {
    this.cardId = cardId
    this.favoriteFilms.push(this.cardId);
  }


   genContent(): void {
    if (this.page < this.totalPages) {
      this.page++

    }
  }

 getFavoriteFilmsInfinity() {
    this.api2Service.getFavoriteFilms(this.page).subscribe((data) => {
      this.favoriteFilms = this.favoriteFilms.concat(data.data.items)
     if(this.favoriteFilms && this.userFavorite) {
      this.favoriteFilms.forEach(item => {
        item.isFavorite = this.userFavorite.includes(item.id);
      });
     }
    })
  } 


  getFavoriteFilms() {
    this.loader = true
    this.api2Service.getFavoriteFilms(this.page).subscribe((data) => {
      this.favoriteFilms = data.data.items
      if (this.userFavorite && this.favoriteFilms) {
        this.favoriteFilms.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);

        });
      }
      this.loader = false
      this.spinner.hide();
      this.totalPages = data.data.pagination.total_pages
      this.totalRecords = data.data.pagination.total
    })
  }
}
