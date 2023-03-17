import { Component, OnInit, Input } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { authService } from '../../services/authService.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteFilms: any
  term: any;
  totalRecords: number
  userFavorite
  page: number
  isFav:boolean = false
  @Input() data: any
  @Input() film: any
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private auth: authService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(x => {
      let user = x
      this.userFavorite = user.favorite_film_ids
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


  getFavoriteFilms() {
    this.api2Service.getFavoriteFilms().subscribe((data) => {
      this.favoriteFilms = data.data.items
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
