import { Component, Input, OnInit, Output, EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { messangerService } from 'src/app/services/messanger.service';


@Component({
  selector: 'app-outcome-requests',
  templateUrl: './outcome-requests.component.html',
  styleUrls: ['./outcome-requests.component.scss']
})
export class OutcomeRequestsComponent implements OnChanges, OnInit {
  isWrapper: boolean = false
  isOutComes: boolean = true
   desOutCome
   @Input() outComes:any
  constructor(
    private messangerService: messangerService,
  ) { }

  ngOnInit() {
    this.getOutComes()
  }

  ngOnChanges(change:SimpleChanges) {
    this.getOutComes()
  }


  getOutComes() {
    let outComesKey="outComes"
    let outComesLs = localStorage.getItem(outComesKey)
    if(outComesLs !== null) {
      this.outComes = JSON.parse(outComesLs)
      if (this.outComes.length === 0) {
        this.isWrapper = true
        this.isOutComes = false
      }
      return
    }
    this.messangerService.getOutComes().subscribe((data) => {
      this.outComes = data.data.items
      localStorage.setItem(outComesKey, JSON.stringify(this.outComes))
      if (this.outComes.length === 0) {
        this.isWrapper = true
        this.isOutComes = false
      }
     
    })
  }

  destroyRequest(outComeId) {
    this.messangerService.destroyRequest(outComeId).subscribe((data) => {
      this.outComes = this.outComes.filter(x => x.id !=outComeId)
      if (this.outComes.length === 0) {
        this.isWrapper = true
        this.isOutComes = false
      }
    })
  }
}
