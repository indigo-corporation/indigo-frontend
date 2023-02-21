import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: any;

  myOptions = {
    'placement': 'left',
    'theme': 'dark',
    'showDelay': 500,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
