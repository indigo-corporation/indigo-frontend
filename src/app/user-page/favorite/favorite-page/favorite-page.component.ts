import { Component, OnInit, Input } from '@angular/core';
import { api2Service } from '../../../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {
  favoriteFilms: any
  term: any;
  totalRecords: string
  page: number
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Избранные")
    this.getFavoriteFilms()
  }


  getFavoriteFilms() {
    this.api2Service.getFavoriteFilms().subscribe((data) => {
      this.favoriteFilms = data.data.items
      this.totalRecords = data.data.pagination.total
      localStorage.setItem("favoriteFilms", JSON.stringify(this.favoriteFilms))
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
