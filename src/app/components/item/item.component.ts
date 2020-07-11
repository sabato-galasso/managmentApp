import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CustomerService } from '../../services/customer.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageSharingService } from '../../services/message-sharing.service'
import { delay, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  centered = false
  disabled = false
  unbounded = false

  radius: number
  color: string

  counter = 0

  @Output() valueChange = new EventEmitter()
  @Output() isActiveTableOutput: boolean
  @Output() cons = new EventEmitter()
  @Input() isActiveTable: boolean
  @Input() numberTable: boolean
  @Input() item: any
  @Input() _id: string
  paramId: any
  private unsubscribe$ = new Subject<void>()
  private isOk: boolean

  constructor(
    private customerService: CustomerService,
    private _route: ActivatedRoute,
    private _router: Router,
    private messageService: MessageSharingService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.paramId = this.route.snapshot.params.id
  }

  ngOnInit(): void {}

  valueChanged(event: any, dataItem: any) {
    event.stopPropagation()
    event.preventDefault()
    this.counter = this.counter + 1
    this.isOk = true
    this.valueChange.emit(this.counter)
    dataItem.quantity = 1
    const array = [
      'esterno-ombrellone-',
      'esterno-pedana-',
      'interno-',
      'biliardi-',
    ]
    let data = {
      priceTable: 1,
      category:
        this.paramId &&
        !array.some((item) => new RegExp(item).test(this.paramId))
          ? 'customer'
          : 'game',
      statusTable: 1,
      nTable: this.numberTable,
      consumazioni: [dataItem],
    }

    if (this.isActiveTable) {
      let data = {
        priceTable: 1,
        category: 'game',
        statusTable: 1,
        nTable: this.numberTable,
        consumazioni: [dataItem],
        _id: this._id,
      }
      this.customerService
        .updateCustomerData(data)
        .pipe(takeUntil(this.unsubscribe$))

        .subscribe(
          (res) => {
            this.isActiveTable = true
            this.messageService.updateId(res._id)
            this.messageService.updateTavoloAttivo(this.isActiveTable)
            this.messageService.updateConsumazioni(res)
          },
          (error) => {}
        )
    } else {
      this.messageService.updateLoading(true)
      this.customerService
        .addNewCustomerData(data)
        .pipe(takeUntil(this.unsubscribe$))
        .pipe(delay(500))
        .subscribe(
          (res) => {
            this.isActiveTable = true
            this.messageService.updateTavoloAttivo(this.isActiveTable)
            this.messageService.updateId(res._id)
            this.messageService.updateConsumazioni(res)
          },
          (error) => {},
          () => {
            this.messageService.updateLoading(false)
            this.openSnackBar('Tavolo aperto')
          }
        )
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: '',
    })
  }

  log() {}
}
