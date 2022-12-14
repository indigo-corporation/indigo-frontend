import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocusDirective]'
})
export class AutoFocusDirectiveDirective implements AfterViewInit {
  @Input() public appAutoFocus:boolean
  
  constructor(private el:ElementRef) { }

  ngAfterViewInit(): void {
      this.el.nativeElement.focus()
  }
}
