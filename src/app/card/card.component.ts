import { Component, OnInit, Input, AfterViewInit, Output,EventEmitter  } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { api2Service } from '../services/api2.service';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { authService } from "../services/authService.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
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
    ),
    trigger(
      'enterAnimationText', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 }))
      ])
    ])
  ],
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: any;
  @Output() removeCard = new EventEmitter<any>();
  login
  user
  userFavorite
  isFavorite: boolean = false
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  constructor( 
    private api2Service: api2Service,
    private modalService: MdbModalService,
    private auth: authService,) { }

  ngOnInit() {
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        this.user = x
       this.userFavorite = this.user.favorite_film_ids
      }
    })
   
  }

  postFavorite() {
    if (!this.login) {
      this.openLogin()
      return
    }
    this.api2Service.postFavorite(this.card.id).subscribe((data) => {
      if(this.userFavorite) {
        this.userFavorite.push(this.card.id)
      }
      this.card.isFavorite = true
    })
  }

  removeFavorite() {
    this.api2Service.removeFavorite(this.card.id).subscribe((data) => {

      if(this.userFavorite) {
        this.removeCard.next(this.card.id)
        this.userFavorite = this.userFavorite.filter(x => x != this.card.id)
        this.userFavorite = data.data.favorite_ids
        this.user.favorite_film_ids = this.userFavorite
        localStorage.setItem("user",JSON.stringify(this.user))
        debugger
      }
      this.card.isFavorite = false   
    })
  }

  mOver(event) {
    const tooltipDiv = event.target.nextElementSibling;
    const tooltipWidth = tooltipDiv.offsetWidth;
    const distanceFromRight = window.innerWidth - event.clientX;
    if (distanceFromRight <= tooltipWidth) {
      tooltipDiv.style.left = "auto";
      tooltipDiv.style.right = "18%";
    } else {
      tooltipDiv.style.right = "auto";
    }

  }

  toolTipClick(event) {
    const tooltipDiv = event.target.nextElementSibling;
    const tooltipWidth = tooltipDiv.offsetWidth;
    const distanceFromRight = window.innerWidth - event.clientX;
    if (distanceFromRight <= tooltipWidth) {
      tooltipDiv.style.left = "auto";
      tooltipDiv.style.right = "25%";
    } else {
      tooltipDiv.style.right = "auto%";
    }
  }

  openLogin() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {
    });
  }

  mOut(event) {
    const tooltipDiv = event.target.nextElementSibling;

  }



}
