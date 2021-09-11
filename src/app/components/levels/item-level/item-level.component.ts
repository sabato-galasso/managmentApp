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
import { Location } from '@angular/common'

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
  isLoading: boolean

  constructor(
    private socketService: WebsocketService,
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private menuService: MenuManagerServiceService,
    private customerService: CustomerService,
    private messageService: MessageSharingService,
    private _location: Location
  ) {
    this.paramId = this.route.snapshot.params.id
    this.subCategorySlug = this.route.snapshot.params.subCategory
    this.categorySlug = this.route.snapshot.params.category

    this.customerTable = {
      status: 0,
      timer: '0',
      price: '0',
    }

    this.messageService
      .getLoading()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.isLoading = res
      })

    this.messageService
      .getId()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (_id) => {
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
          this.isActiveTable = isActive
        },
        (error) => {
          alert(error)
        }
      )
  }

  ngOnInit(): void {
    if (this.subCategorySlug) {
      this.menuService
        .filterByCategoryAndSubcategory(this.categorySlug, this.subCategorySlug)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.items = res
        })
    } else {
      this.menuService
        .getMenuCategoryItems(this.categorySlug)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.items = res
        })
    }

    this.customerService
      .getCustomerDataByTable(this.paramId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.isActiveTable = res && res.summed.length > 0
          this._id = res && res._id ? res._id : null
        },
        (error) => {}
      )
  }

  closeTable() {
    /* this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg

    });*/
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  back() {
    this._location.back()
  }
}
