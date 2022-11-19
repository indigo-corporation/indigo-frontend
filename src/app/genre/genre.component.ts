import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { type } from 'jquery';
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  totalRecords: string
  data: any
  page: number = 1
  id: any
  term: any
  name: any
  genres: any
  genre:any
  type:any
  constructor(private api2Service: api2Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.type = this.route.snapshot.paramMap.get("type")
    this.getGenreFilms(this.id,1,this.type)
  }



  getGenreFilms(id,page,type) {
    this.api2Service.getGenreFilms(id,page,type).subscribe((data) => {
      this.data = data.data.items
      console.log(this.data);
    });
  }

  onPageChange(query, page) {
    this.page = page
    this.router.navigate(["/genre/" + this.id], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    });
    this.getGenreFilms(this.id,page,this.type)
  }
}
