import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EverythingServiceService {
  private users:any;
  onClick:EventEmitter<any> = new EventEmitter();

  public doClick($event) {
    this.users = $event
    this.onClick.next(this.users);
    debugger
  }
}
