import { Component, OnInit, Input, AfterViewInit,  } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { api2Service } from '../services/api2.service';

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
  isFavorite: boolean = false
  /*   @Input() container: HTMLElement; */
  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  constructor( private api2Service: api2Service,) { }

  ngOnInit() {


  }

  postFavorite() {
    let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
    
    this.api2Service.postFavorite(this.card.id).subscribe((data) => {
      if(favoriteFilmIds) {
        favoriteFilmIds = JSON.parse(favoriteFilmIds)
      favoriteFilmIds.push(this.card.id)
      localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds))
      }
      debugger
      this.card.isFavorite = true
    })
  }

  removeFavorite() {
    let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
    debugger
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

  mOut(event) {
    const tooltipDiv = event.target.nextElementSibling;

  }



}
