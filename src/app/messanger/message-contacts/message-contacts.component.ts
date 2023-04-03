import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { messangerService } from 'src/app/services/messanger.service';
import { authService } from '../../services/authService.service';
import { ModalContactComponent } from './modalcontact/modalcontact.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalAddContactComponent } from './modal-add-contact/modal-add-contact.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-message-contacts',
  templateUrl: './message-contacts.component.html',
  styleUrls: ['./message-contacts.component.scss']
})
export class MessageContactsComponent implements OnInit {
  myUser: any
  modalRef: MdbModalRef<ModalContactComponent> | null = null;
  contacts:any
  contact:any
  term:any
  outComes:any
  outComesId:number
  totalRecords:number
  page: number
  totalPages : number
  currentPage: number
  @Output() onContact = new EventEmitter<any>();
  @Output() onOutComesId = new EventEmitter<any>();
  
  constructor(
    private messangerService:messangerService,
    private auth:authService,
    private modalService: MdbModalService,
    private router:Router,
    private meta:Meta,
    private title:Title
  ) {
 
   }

  ngOnInit() {
    this.title.setTitle("Друзья")
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.myUser = x
    })
    this.getContacts()
  }

  onScroll() {
    if(this.page < this.totalPages) {
      this.page++
      this.getContactsInfinity()
    }
  }

  onKeyupEvent($event:any) {
    if($event.target.value.length === 0) {
      this.getContacts()
    }
    if ($event.target.value.length >= 2) {
      this.getSearchContacts($event.target.value)
    }
  }

  getSearchContacts(find) {
    this.messangerService.getSearchContacts(find).subscribe((data)=> {
      this.contacts = data.data.items
    })
  }

  getOutComes() {
    this.messangerService.getOutComes().subscribe((data)=> {
      this.outComes = data.data.items
    
    })
  }

  OnChat(contactId) {
    this.messangerService.getChatByUser(contactId).subscribe((data) => {
      let chat = data.data
      this.router.navigate(["message/" + chat.id])

    })
  }

  getContacts() {
    this.messangerService.getContacts(this.page).subscribe((data)=> {
      this.contacts = data.data.items
      this.totalRecords = data.data.pagination.total
      this.totalPages = data.data.pagination.total_pages
      this.currentPage = data.data.pagination.current_page
      this.page = this.currentPage
    })
  }

  getContactsInfinity() {
    this.messangerService.getContacts(this.page).subscribe((data)=> {
       this.contacts = this.contacts.concat(data.data.items)
    })
  }

  openModaladdContact() {
    this.modalRef = this.modalService.open(ModalAddContactComponent, {
    }); 
    this.modalRef.onClose.subscribe((data: any) => { 
        this.outComesId = data.data.id
        this.onOutComesId.next(this.outComesId)
  })
}

  openModal($event) {
    this.modalRef = this.modalService.open(ModalContactComponent, {
      data: { contact:$event },
    }); 
   this.modalRef.onClose.subscribe((data: any) => {
    if(data != null) {
      this.contacts =  this.contacts.filter(x => x.id != data)
      this.contact = false
      this.onContact.next(this.contact)
    } 
    });
  }

}
