import { Component, Input, OnInit,HostListener, ElementRef  } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { Meta } from '@angular/platform-browser';
import { ViewportScroller} from '@angular/common';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
@Input() data: any
pageYoffset = 0;
@HostListener('window:scroll', ['$event']) onScroll(event){
  this.pageYoffset = window.pageYOffset;
}

constructor(private scroll: ViewportScroller,
  private seo:SeoService,
  private readonly Meta:Meta) 
  {
   
   }

  ngOnInit():void {
 /*    this.seo.initDefaultMetaInfomation() */

  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

}
