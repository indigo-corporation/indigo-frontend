import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss']
})
export class VoiceComponent implements OnInit {

  defaultImage = "../../assets/favicon.ico"  
  futurama = "../../assets/futuramaBack.webp"

  constructor() { }

  ngOnInit(): void {
  }

}
