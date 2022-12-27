import { Component, OnInit, HostListener, Inject,ViewChild,ElementRef} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthPopup } from "../auth-popup/auth-popup.component";
import { authService } from "../services/authService.service";
import { MatMenuModule } from '@angular/material/menu';
import { api2Service } from '../services/api2.service';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  login: boolean = false
  isShown: boolean = false;
  isArrow1: boolean = false;
  isArrow2: boolean = false;
  isArrow3: boolean = false;
  isArrow4: boolean = false;
  @Input() data: any
  arrowId: any = ""
  user: any
  film: any
  body: any
  serchElm
  isNotification:boolean = false
  arrowIdValue
  window: any
  id: any
  page: any
  constructor(
    private router: Router,
    @Inject(DOCUMENT) document,
    private route: ActivatedRoute,
    private http: HttpClient,
    private host:ElementRef,
    private snackBar: MatSnackBar,
    private auth: authService,
    private api2Service: api2Service,
    private MatMenuModule: MatMenuModule,
    private dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
      if (evt instanceof NavigationEnd) {
        this.arrowsUp()
        this.searchClose() 
        this.isCollapsed = true;
        this.isNotification = false
      }
    });
    
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 211) {
       let element = document.getElementById('navbar');
       $( "nav" ).addClass( "sticky" );
     } else {
      let element = document.getElementById('navbar');
        $( "nav" ).removeClass( "sticky" );
     }
  }
  

  ngOnInit() {
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.login = x != null
      this.user = x
      this.isShown = false;
    })
  }
 

  toggleSearch() {
    this.isShown = !this.isShown  
  }

  toggleBell() {
    this.isNotification = !this.isNotification
  }

  genreArrow($event) {
    let elm = $($event.target)
    if (!elm.hasClass("arrow")) {
      elm = elm.find(".arrow")
    }
      let arrowId
      arrowId = elm.attr("id")
      let arrowIdValue = this[arrowId]
      this.arrowsUp()
      this[arrowId] = !arrowIdValue
      if (this[arrowId]) {
        elm.css('transform', 'rotate(180deg)')
        elm.css('color', 'black');
      }
  }

  arrowsUp() {
    this.isArrow1=false
    this.isArrow2=false
    this.isArrow3=false
    this.isArrow4=false
    $('.fas.fa-caret-down').css('transform', 'rotate(0deg)');
    $('.fas.fa-caret-down').css('color', 'white')
  }


  searchClose() {
    this.isShown = false
  }

  onKeyPressEvent($event: any) {
    if ($event.target.value.length >= 1) {
      this.search($event.target.value, 1)
    }
  }

  search(find, page) {
    this.api2Service.search(find, page).subscribe((data) => {
      this.data = data.data.items
    })
  }

  signOut() {
    this.auth.logOut()
  }


  openDialog() {
    const dialogRef = this.dialog.open(AuthPopup, {
      autoFocus: false,
      maxHeight: '90vh'
    }) 

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

