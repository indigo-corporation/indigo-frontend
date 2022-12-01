import { Component, OnInit, HostListener, Inject  } from '@angular/core';
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
  arrowIdValue
  window: any
  id: any
  page: any
  constructor(
    private router: Router,
    @Inject(DOCUMENT) document,
    private route: ActivatedRoute,
    private http: HttpClient,
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
      }
    });
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 180) {
      console.log(window.pageYOffset);
      
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
      console.log(this.login);
      this.isShown = false;
    })
  }


  toggleSearch() {
    this.isShown = !this.isShown
  }

  genreArrow($event) {
    let elm = $($event.target)
    if (!elm.hasClass("arrow")) {
      elm = elm.find(".arrow")
    }
    console.log(elm);
      let arrowId
      arrowId = elm.attr("id")
      let arrowIdValue = this[arrowId]
      debugger
      this.arrowsUp()
      this[arrowId] = !arrowIdValue
      console.log(arrowId,this[arrowId]);
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
    $('.fas.fa-caret-up').css('transform', 'rotate(0deg)');
    $('.fas.fa-caret-up').css('color', 'white')
  }


  searchClose() {
    this.isShown = false
  }

  onKeyPressEvent($event: any) {
    if ($event.target.value.length >= 1) {
      this.search($event.target.value, 1)
    }
    console.log($event.target.value.length);

  }
  search(find, page) {
    console.log(find, page);
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

