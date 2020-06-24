import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomerTableModel} from "../../models/CustomerTableModel";
import {CustomerService} from "../../services/customer.service";
import {MessageSharingService} from "../../services/message-sharing.service";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit, OnDestroy {

  @Input() numberTable: string;
  @Input() customerTable: CustomerTableModel;
  @Input() consumazioni: any;
  private subscription: Subscription;
  private subscriptionTavoloAttivo: Subscription;
  tavoloAttivo: boolean;
  _id:string
  private unsubscribe$ = new Subject<void>()
  total: any;
  private subscriptionId: Subscription;

  constructor(private customerService: CustomerService,
              private messageService: MessageSharingService) {
    this.customerTable = {
      price: '0',
      timer: '0',
      status: 0
    }

    this.subscription = this.messageService.getConsumazioni()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(consumazioni => {
        this.consumazioni = consumazioni.summed
        this.total = consumazioni.total
      },error => {
        alert(error)
      } )

    this.subscriptionTavoloAttivo = this.messageService.getTavoloAttivo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(mymessage => {
        this.tavoloAttivo = mymessage
      },error => {
        alert(error)
      })

    this.subscriptionId = this.messageService.getId()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(id => {
        debugger
        this._id = id
      },error => {
        alert(error)
      })
  }

  ngOnInit(): void {

    this.customerService.getCustomerDataByTable(this.numberTable)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
      res => {
        debugger
        console.log(res)
        this._id = res._id || null
        this.consumazioni = res && res.summed.length > 0 ?  res.summed : null
        this.tavoloAttivo = res && res.summed.length > 0
        this.total = res.total || 0.00

      }, error => {
        console.log(error)
      }
    );
  }


  closeTable() {
    let data = {
      nTable:this.numberTable,
      _id: this._id
    }
    this.customerService.closeCustomerData(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe( res =>{
      console.log('close',res)
      this.tavoloAttivo = false
      this.consumazioni = null
    })

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  removeItem() {

  }
}
