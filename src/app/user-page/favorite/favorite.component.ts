import { Component, OnInit, Input } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { authService } from '../../services/authService.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
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
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteFilms: any
  term: any;
  totalRecords: number
  page: number
  cardId
  user
  loader:boolean = true
  isFav:boolean = false
  @Input() data: any
  @Input() film: any
  @Input() userFavorite: any
  constructor(
    private api2Service: api2Service,
    private spinner: NgxSpinnerService,
    private router: Router,
    private auth: authService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.auth.user$.subscribe(x => {
      this.user = x
      this.userFavorite = this.user.favorite_film_ids
    })
    this.getFavoriteFilms()
  }

  ngAfterViewInit () {
    if(this.favoriteFilms) {
        this.isFav = true
      } else {
        this.isFav = false
      }
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
    const newFavorites = this.favoriteFilms.map(film => film.id);
    this.userFavorite = this.user.favorite_film_ids
    this.auth.user$.next(this.userFavorite);
  }


  getFavoriteFilms() {
    this.api2Service.getFavoriteFilms().subscribe((data) => {
      this.favoriteFilms = data.data.items
      this.spinner.hide();
      this.loader = false
      if(this.favoriteFilms.length === 0) {
          this.isFav = true
        } else {
          this.isFav = false
        }
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
    this.router.navigate(["/"], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    });
  }
}
