import { Component, OnInit, Input, AfterViewInit,  } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

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
    )
  ],
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: any;
  /*   @Input() container: HTMLElement; */
  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  constructor() { }

  ngOnInit() {


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
