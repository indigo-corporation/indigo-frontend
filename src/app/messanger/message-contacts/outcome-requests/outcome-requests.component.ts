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

/*   _outComes:any
  get outComes():any {
    return this._outComes;
  }

   @Input() set outComes(value:any) {
    this._outComes = value
    this.getOutComes()
   } */
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
    this.messangerService.getOutComes().subscribe((data) => {
      this.outComes = data.data.items
      if (this.outComes.length === 0) {
        this.isWrapper = true
        this.isOutComes = false
      }
      debugger

    })
  }

  destroyRequest(outComeId) {
    debugger
    this.messangerService.destroyRequest(outComeId).subscribe((data) => {
      this.outComes = this.outComes.filter(x => x.id !=outComeId)
      if (this.outComes.length === 0) {
        this.isWrapper = true
        this.isOutComes = false
      }
      debugger
    })
  }
}
