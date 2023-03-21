import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { api2Service } from '../../../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { authService } from '../../../services/authService.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {
  favoriteFilms: any
  term: any;
  totalRecords: number
  page: number
  userFavorite
  cardId 
  user
  @Output() filterUserFavorite = new EventEmitter<any>();
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private auth: authService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Избранные")
  
    this.auth.user$.subscribe(x => {
      this.user = x
      this.getFavoriteFilms()
      this.userFavorite = this.user.favorite_film_ids
    })
  }

  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  filterCard(cardId) {
    debugger
    this.cardId = cardId
    this.favoriteFilms = this.favoriteFilms.filter(x => x.id !== cardId);
  }


  getFavoriteFilms() {
    this.api2Service.getFavoriteFilms().subscribe((data) => {
      this.favoriteFilms = data.data.items
      if (this.userFavorite) {
        this.favoriteFilms.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }
      this.totalRecords = data.data.pagination.total
    })
  }

  onPageChange(page) {
    this.page = page
    this.router.navigate(["/favorite"], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    });
  }
}
