import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CustomerService } from '../../services/customer.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageSharingService } from '../../services/message-sharing.service'
import { delay, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar/snack-bar-config'

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

  @Output() valueChange = new EventEmitter()
  @Output() isActiveTableOutput: boolean
  @Output() cons = new EventEmitter()
  @Input() isActiveTable: boolean
  @Input() numberTable: boolean
  @Input() item: any
  @Input() _id: string
  paramId: any
  private unsubscribe$ = new Subject<void>()

  constructor(
    private customerService: CustomerService,
    private _router: Router,
    private messageService: MessageSharingService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.paramId = this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {}

  valueChanged(event: any, dataItem: any) {
    event.preventDefault()
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

    this.customerService
      .openedCustomerData(this.paramId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res && res.length > 0) {
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
              (error) => {},
              () => {
                this.openSnackBar('Ordine Aggiunto', 1000, 'top')
              }
            )
        } else {
          this.messageService.updateLoading(true)
          this.customerService
            .addNewCustomerData(data)
            .pipe(takeUntil(this.unsubscribe$))
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
      })
  }

  openSnackBar(
    message: string,
    duration = 1000,
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    this._snackBar.open(message, '', {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: verticalPosition,
      panelClass: 'notify-success',
    })
  }
}
