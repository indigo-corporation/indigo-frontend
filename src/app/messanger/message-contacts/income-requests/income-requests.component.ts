import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { messangerService } from 'src/app/services/messanger.service';

@Component({
  selector: 'app-income-requests',
  templateUrl: './income-requests.component.html',
  styleUrls: ['./income-requests.component.scss']
})
export class IncomeRequestsComponent implements OnInit {
  inComes:any
  isWrapper:boolean = false
  isInComes:boolean = true
  @Output() onAccept = new EventEmitter<any>();
  constructor(
    private messangerService:messangerService,
  ) { }

  ngOnInit() {
    this.getInComes()
  }

getInComes() {
    this.messangerService.getInComes().subscribe((data)=> {
      this.inComes = data.data.items
      if(this.inComes.length === 0) {
        this.isWrapper = true
        this.isInComes = false
      }
    })
  }

  acceptRequest(requestId,userId) {
    this.messangerService.acceptRequest(requestId).subscribe((data)=> {
      this.inComes.push(requestId)
      this.inComes = this.inComes.filter(x => x.id != requestId)
      this.getInComes()
    })
  }

  destroyRequest(requestId) {
    this.messangerService.destroyRequest(requestId).subscribe((data)=> {
      this.inComes = this.inComes.filter(x => x.id != requestId)
    })
  }
}
