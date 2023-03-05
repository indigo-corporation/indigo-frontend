import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-for-swipers',
  templateUrl: './card-for-swipers.component.html',
  styleUrls: ['./card-for-swipers.component.scss']
})
export class CardForSwipersComponent implements OnInit,AfterViewInit{
  @Input() card: any;

  private subscription = new Subscription();
  sliderWidth:number
  constructor(
  ) { }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    
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
