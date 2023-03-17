import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';
import { api2Service } from '../services/api2.service';
import { authService } from "../services/authService.service";
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-card-for-swipers',
  templateUrl: './card-for-swipers.component.html',
  animations: [
    trigger(
      'enterAnimationText', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 }))
      ])
    ])
  ],
  styleUrls: ['./card-for-swipers.component.scss']
})
export class CardForSwipersComponent implements OnInit,AfterViewInit{
  @Input() card: any;
  login
  private subscription = new Subscription();
  sliderWidth:number
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  constructor(
    private api2Service: api2Service,
    private auth: authService,
    private modalService: MdbModalService,
  ) 
  { }

  ngOnInit() {
    this.auth.user$.subscribe(x => {
      this.login = x != null
    })
  }

  ngAfterViewInit() {
    
  }

  postFavorite() {
    if (!this.login) {
      this.openLogin()
      return
    }
    let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
    
    this.api2Service.postFavorite(this.card.id).subscribe((data) => {
      if(favoriteFilmIds) {
        favoriteFilmIds = JSON.parse(favoriteFilmIds)
      favoriteFilmIds.push(this.card.id)
      localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds))
      }
      this.card.isFavorite = true
    })
  }

  openLogin() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {
    });
  }

  removeFavorite() {
    let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
    this.api2Service.removeFavorite(this.card.id).subscribe((data) => {
      if(favoriteFilmIds){
        favoriteFilmIds = JSON.parse(favoriteFilmIds)
        favoriteFilmIds = favoriteFilmIds.filter(x => x != this.card.id)
        localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds)) 
      }
      this.card.isFavorite = false   
    })
  }

  mOver(event) {
  let swiper = event.fromElement?.swiper?.width
    const tooltipDiv = event.target.nextElementSibling;
    const tooltipWidth = tooltipDiv.offsetWidth;
    const distanceFromRight = swiper - event.clientX;
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

}
