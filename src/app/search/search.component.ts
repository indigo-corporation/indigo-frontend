import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  animations: [
    trigger('enterAnimationPage', [
      transition(':enter', [
        style({ height: '0', opacity: '0', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '*', opacity: '1', overflow: 'hidden' }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '0', opacity: '0', overflow: 'hidden' }))
      ])
    ]
    )
  ],
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  totalRecords: string
  data: any
  term: string
  @Output() onSearchSubmmited = new EventEmitter<any>();
  query: string
  find: string
  page: any
  category 
  public id: any
  constructor(
    private input: ElementRef, 
    public dialogRef: MatDialogRef<SearchComponent>, 
    private api2Service: api2Service, 
    private router: Router, 
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    /* this.category = this.route.snapshot.url[0].path */
  }

  @ViewChild("search") el:ElementRef;
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

  onKeyUpEvent($event: any) {
    if ($event.target.value.length === 0) {
      this.data = []
    }
    if ($event.target.value.length >= 2) {
      this.search($event.target.value, 1)
    }
  }

  onSearch(search) {
    const term = search || "";
      this.router.navigate(["/search-page"], {
        queryParams: {
          page: 1,
          term: term
        }
      });
      this.onSearchSubmmited.next(true)
    }


  search(find, page) {
    this.api2Service.search(find, page).subscribe((data) => {
      this.data = data.data.items
    })
  }
}
