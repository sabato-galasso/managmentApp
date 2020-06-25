import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { WebsocketService } from '../../../services/socket.service'
import { CustomerTableModel } from '../../../models/CustomerTableModel'
import { ActivatedRoute } from '@angular/router'
import { WarehouseService } from '../../../services/warehouse.service'
import { MenuManagerServiceService } from '../../../services/menu-manager-service.service'
import { CustomerService } from '../../../services/customer.service'
import { MessageSharingService } from '../../../services/message-sharing.service'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-item-level',
  templateUrl: './item-level.component.html',
  styleUrls: ['./item-level.component.scss'],
})
export class ItemLevelComponent implements OnInit, OnDestroy {
  paramId: string
  customerTable: CustomerTableModel
  private categorySlug: string
  items = []
  subCategorySlug: string
  isActiveTable: boolean
  _id: string
  private unsubscribe$ = new Subject<void>()

  constructor(
    private socketService: WebsocketService,
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private menuService: MenuManagerServiceService,
    private customerService: CustomerService,
    private messageService: MessageSharingService
  ) {
    this.paramId = this.route.snapshot.params.id
    this.subCategorySlug = this.route.snapshot.params.category1
    this.categorySlug = this.route.snapshot.params.category

    this.customerTable = {
      status: 0,
      timer: '0',
      price: '0',
    }

    this.messageService
      .getId()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (_id) => {
          debugger
          this._id = this._id ? this._id : _id
        },
        (error) => {
          alert(error)
        }
      )

    this.messageService
      .getTavoloAttivo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (isActive) => {
          debugger
          this.isActiveTable = isActive
        },
        (error) => {
          alert(error)
        }
      )
  }

  ngOnInit(): void {
    /* this.socketService.getSocket(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });*/
    debugger
    if (this.subCategorySlug) {
      this.menuService
        .test(this.categorySlug, this.subCategorySlug)
        .subscribe((res) => {
          console.log(res)
          this.items = res
        })
    } else {
      this.menuService
        .getMenuCategoryItems(this.categorySlug)
        .subscribe((res) => {
          console.log(res)
          this.items = res
        })
    }

    this.customerService.getCustomerDataByTable(this.paramId).subscribe(
      (res) => {
        console.log('dsdsd', res)
        debugger
        this.isActiveTable = res && res.summed.length > 0
        this._id = res && res._id ? res._id : null
      },
      (error) => {
        console.log(error)
      }
    )
  }

  closeTable() {
    /* this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });*/
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
