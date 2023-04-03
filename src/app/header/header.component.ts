import { Component, OnInit, HostListener, Inject, ElementRef, ChangeDetectorRef,ApplicationRef} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { authService } from "../services/authService.service";
import { MatMenuModule } from '@angular/material/menu';
import { api2Service } from '../services/api2.service';
import { Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-header',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('600ms', style({ opacity: 0 }))
      ])
    ]
    ),
    trigger(
      'enterAnimationLogin', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('700ms', style({ opacity: 0 }))
      ])
    ]
    ),
    trigger(
      'subMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms', style({ opacity: 0 }))
      ])
    ]
    )
  ],
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
  isNotification: boolean = false
  arrowIdValue
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  window: any
  id: any
  threshold: number;
  page: any
  category
  user$: Observable<Date>;
  isMenuOpen: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar,
    private auth: authService,
    private api2Service: api2Service,
    private modalService: MdbModalService,
    private MatMenuModule: MatMenuModule,
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
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
        this.isMenuOpen = false
        this.isCollapsed = true;
        this.isNotification = false
      }
    });

  }



  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.threshold = 202;
    const navbar = this.elementRef.nativeElement.querySelector('#navbar');
    if (window.matchMedia('(max-width: 600px)').matches) {
      this.threshold = 100;
    }

    if (window.pageYOffset > this.threshold) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  ngOnInit() {
    if (this.auth.user$ && this.auth.user$.subscribe) {
      this.auth.user$.subscribe(x => {
        this.login = x != null
        this.user = x  
        this.isShown = false;
      })
    }
  
  }

  toggleSearch() {
    this.isShown = !this.isShown
  }

  toggleBell() {
    this.isNotification = !this.isNotification
  }

  genreArrow(event: Event): void {
    const elm = event.target as HTMLElement;
    let arrowElm: HTMLElement | null = null;
    if (elm.classList.contains("arrow")) {
      arrowElm = elm;
    } else {
      arrowElm = elm.querySelector(".arrow");
    }
    if (arrowElm) {
      const arrowId = arrowElm.id;
      const arrowIdValue = this[arrowId];
      this.arrowsUp();
      this[arrowId] = !arrowIdValue;
      if (this[arrowId]) {
        (arrowElm as HTMLElement).style.transform = "rotate(180deg)";
        (arrowElm as HTMLElement).style.color = "black";
      } else {
        (arrowElm as HTMLElement).style.transform = "";
        (arrowElm as HTMLElement).style.color = "";
      }
    }
  }

  arrowsUp(): void {
    this.isArrow1 = false;
    this.isArrow2 = false;
    this.isArrow3 = false;
    this.isArrow4 = false;
    const arrowElms = document.querySelectorAll(".arrow");
    if (arrowElms.length) {
      arrowElms.forEach((arrowElm) => {
        (arrowElm as HTMLElement).style.transform = "";
        (arrowElm as HTMLElement).style.color = "";
      });
    }
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
    this.auth.logOut().subscribe((data)=> {
      localStorage.clear()
      window.location.replace('')
    })
  }


  openModal() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {

    });
  }

}
