import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { messangerService } from '../../../services/messanger.service'

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modalcontact.component.html',
  styleUrls: ['./modalcontact.component.scss']
})
export class ModalContactComponent implements OnInit {
  contact:any
  contacts:any
  chatsFiltr:any
  constructor(
    public modalRef: MdbModalRef<ModalContactComponent>,
    private messangerService: messangerService,
  ) {

  }

  ngOnInit() {
    console.log(this.contact);
    this.getContacts()
  }

  close(): void {
    this.modalRef.close(this.contact)
  }

  getContacts() {
    this.messangerService.getContacts().subscribe((data)=> {
      this.contacts=data.data.items
    })
  }

  deleteContact() {
    let contactId = this.contact
    debugger
    this.messangerService.removeContact(contactId).subscribe((data) => {
      console.log(this.contacts);
      
      debugger
      this.close()
    })
  }
}
