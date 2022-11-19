import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { messangerService } from '../../../services/messanger.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-modal-add-contact',
  templateUrl: './modal-add-contact.component.html',
  styleUrls: ['./modal-add-contact.component.scss']
})
export class ModalAddContactComponent implements OnInit {
  users: any
  navItemIdValue
  isNavItem: boolean = false
  navItemId: any = ""
  data
  userId: number
  constructor(
    public modalRef: MdbModalRef<ModalAddContactComponent>,
    private messangerService: messangerService,
    private router:Router
  ) { 
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
      if (evt instanceof NavigationEnd) {
       this.close()
      }
    });
  }

  ngOnInit() {

  }

  close(): void {
    this.modalRef.close(this.data)
  }


  onKeyupEvent($event: any) {
    if ($event.target.value.length >= 2) {
      this.getUsersSearch($event.target.value)
    }
    console.log($event.target.value.length);
  }

  getUsersSearch(find) {
    this.messangerService.getUsersSearch(find).subscribe((data) => {
      this.users = data.data.items
    })
  }

  addContact(userId) {
    this.userId = userId
    debugger
    this.messangerService.addContact(this.userId).subscribe((data) => {
      this.data = data
      debugger
      this.close()
    })
  }
}
