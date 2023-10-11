import { Component, OnInit, Input,ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';
import { api2Service } from '../services/api2.service';
import { authService } from "../services/authService.service";
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import 'intersection-observer';


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
export class CardForSwipersComponent implements OnInit {
  private intersectionObserver: IntersectionObserver;
  @Input() card: any;
  login
  private subscription = new Subscription();
  sliderWidth:number
  userFavorite 
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  defaultImage = "../../assets/favicon.ico"  
  constructor(
    private api2Service: api2Service,
    private auth: authService,
    private elementRef: ElementRef,
    private modalService: MdbModalService,
  ) 
  { }

  ngOnInit() {

    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Изображение стало видимым, загрузить его
          const img = entry.target.querySelector('.swiper-lazy') as HTMLImageElement;
          img.src = img.getAttribute('data-src') || '';
          this.intersectionObserver.unobserve(entry.target);
        }
      });
    });

    // Найдите элементы, которые вы хотите следить, и начните наблюдение за ними
    const swiperSlides = this.elementRef.nativeElement.querySelectorAll('.swiper-slide');
    swiperSlides.forEach(slide => {
      this.intersectionObserver.observe(slide);
    });
    
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
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

  openLogin() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {
    });
  }

  removeFavorite() {
    this.api2Service.removeFavorite(this.card.id).subscribe((data) => {
      if(this.userFavorite){
        this.userFavorite = this.userFavorite.filter(x => x != this.card.id)
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
