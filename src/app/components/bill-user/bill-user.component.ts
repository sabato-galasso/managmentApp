import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { CustomerTableModel } from '../../models/CustomerTableModel'
import { CustomerService } from '../../services/customer.service'
import { MessageSharingService } from '../../services/message-sharing.service'
import { Subject, Subscription } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { MenuManagerServiceService } from '../../services/menu-manager-service.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar/snack-bar-config'

@Component({
  selector: 'app-user-items',
  templateUrl: './bill-user.component.html',
  styleUrls: ['./bill-user.component.scss'],
})
export class BillUserComponent implements OnInit, OnDestroy {
  @Input() numberTable: string
  @Input() customerTable: CustomerTableModel
  @Input() consumazioni: any
  private subscription: Subscription
  private subscriptionTavoloAttivo: Subscription
  tavoloAttivo: boolean
  _id: string
  private unsubscribe$ = new Subject<void>()
  total: any
  private subscriptionId: Subscription

  constructor(
    private customerService: CustomerService,
    private messageService: MessageSharingService,
    private menuService: MenuManagerServiceService,
    private _snackBar: MatSnackBar
  ) {
    this.subscription = this.messageService
      .getConsumazioni()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (consumazioni) => {
          this.consumazioni = consumazioni.summed
          this.total = consumazioni.total
        },
        (error) => {
          alert(error)
        }
      )

    this.subscriptionTavoloAttivo = this.messageService
      .getTavoloAttivo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (mymessage) => {
          this.tavoloAttivo = mymessage
        },
        (error) => {
          alert(error)
        }
      )

    this.subscriptionId = this.messageService
      .getId()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (id) => {
          this._id = this._id ? this._id : id
        },
        (error) => {
          alert(error)
        }
      )
  }

  ngOnInit(): void {
    this.customerService
      .getCustomerDataByTable(this.numberTable)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          console.log(res)
          this._id = res._id || null
          this.consumazioni = res && res.summed.length > 0 ? res.summed : null
          this.tavoloAttivo = res && res.summed.length > 0
          this.total = res.total.toFixed(2) || 0.0
        },
        (error) => {
          console.log(error)
        }
      )
  }

  closeTable() {
    let data = {
      nTable: this.numberTable,
    }
    this.customerService
      .closeCustomerData(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.tavoloAttivo = false
          this.consumazioni = null
          this.messageService.updateId(null)
          this.messageService.updateTavoloAttivo(this.tavoloAttivo)
          this.messageService.updateConsumazioni([])
        },
        (error) => {},
        () => {
          this.openSnackBar('Tavolo Chiuso')
        }
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  removeItem(item: any, ids: string) {
    item._id = this._id
    item.ids = ids
    this.customerService
      .getIndexItemCustomerData(item)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res && !isNaN(res.index)) {
          item.index = res.index
          this.customerService
            .removeItemCustomerData(item)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              (resp) => {
                this._id = resp._id || null
                this.consumazioni =
                  resp && resp.summed.length > 0 ? resp.summed : []
                this.tavoloAttivo = true
                this.total = resp.total.toFixed(2) || 0.0
              },
              (error) => {},
              () => {
                this.openSnackBar('Ordine rimosso', 1000, 'bottom')
              }
            )
        }
      })
  }

  addItem(item: any, ids: string) {
    item._id = this._id
    item.ids = ids

    this.menuService
      .getItemMenu(item)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        // @ts-ignore
        res.quantity = 1
        if (this.tavoloAttivo) {
          let data = {
            priceTable: 1,
            category: 'game',
            statusTable: 1,
            nTable: this.numberTable,
            consumazioni: [res],
            _id: this._id,
          }
          this.customerService
            .updateCustomerData(data)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              (res) => {
                console.log(res)
                this.tavoloAttivo = true
                this.messageService.updateId(res._id)
                this.messageService.updateTavoloAttivo(this.tavoloAttivo)
                this.messageService.updateConsumazioni(res)
              },
              (error) => {}
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
      panelClass: '',
    })
  }
}
