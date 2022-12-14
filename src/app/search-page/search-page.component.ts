import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  term: any
  totalRecords: string
  page: number = 1
  data: Array<any>
  name: any
  find:any
  public id: any
  constructor(
    private api2Service: api2Service, 
    private router: Router, 
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title ) {
    this.data = new Array<any>()
    /*  this.router.routeReuseStrategy.shouldReuseRoute = function () {
       return false;
     };
     this.router.events.subscribe((evt) => {
       if (evt instanceof NavigationEnd) {
         this.router.navigated = false;
       }
     }); */
  }
  ngOnInit() {
    this.title.setTitle("Поиск")
    this.page=this.route.snapshot.queryParams.page
    this.route.queryParams.subscribe((queryParams:any) => {
      this.page = queryParams.page;
      this.term = queryParams.term;
      this.search(this.term)

     });
    this.term=this.route.snapshot.queryParams.find
    if(this.term) {
      this.search(this.term)
    }
  }
  
  getData(page) {
    this.api2Service.getData(page).subscribe((data) => {
      console.log(data);
      this.data = data.data.items
      this.totalRecords = data.data.pagination.total
    });
  }


  onKeyPressEvent($event: any) {
    if ($event.target.value.length >= 1) {
      this.search($event.target.value, 1)
    }
    console.log($event.target.value.length);

  }

  search(find, page=1) {
    if(!find) {
      return
    }
    console.log(find, page);
    this.api2Service.search(find, page).subscribe((data) => {
      
      this.data = data.data.items
      this.totalRecords = data.data.pagination.total
    })
  }

  onPageChange(page) {
    this.page = page
    this.router.navigate(["/search-page"], {
      relativeTo: this.route,
      queryParams: {
        page: this.page,
        find: this.term
      }
    });
    if (this.term) {
      this.search(this.term, page);
    }
  }
}
