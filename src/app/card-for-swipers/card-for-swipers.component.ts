import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-for-swipers',
  templateUrl: './card-for-swipers.component.html',
  styleUrls: ['./card-for-swipers.component.scss']
})
export class CardForSwipersComponent implements OnInit {
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
