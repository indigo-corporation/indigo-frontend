import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { api2Service } from '../services/api2.service';
import { api } from '../services/api.service';
import { Router, NavigationStart, NavigationEnd} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  totalRecords: string
  data: any
  term: string
  @Output() onSearchSubmmited = new EventEmitter<any>();
  query: string
  find: string
  page: any
  public id: any
  constructor(public dialogRef: MatDialogRef<SearchComponent>,private api2Service:api2Service, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit() {

  }

  onKeyUpEvent($event:any) {
    if($event.target.value.length === 0) {
      this.data=[]
    }
    
    if ($event.target.value.length >= 2) {
      this.search($event.target.value, 1)
    }
    console.log($event.target.value.length);
    console.log($event.target.value);
  }

  onSearch(search) {
    this.router.navigate(["/search-page"], {
      queryParams: {
        page: 1,
        term: search
      }
    });
    this.onSearchSubmmited.next(true)
  }
  
  search(find, page) {
    console.log(find, page);
    this.api2Service.search(find, page).subscribe((data) => {
      this.data = data.data.items
    })
  }
}
