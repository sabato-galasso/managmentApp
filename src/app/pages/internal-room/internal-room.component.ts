import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { SettingsTable } from '../../models/SettingsTable'
import { SettingsTableService } from '../../services/settings-table.service'
import { takeUntil } from 'rxjs/operators'
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-internal-room',
  templateUrl: './internal-room.component.html',
  styleUrls: ['./internal-room.component.scss'],
})
export class InternalRoomComponent implements OnInit {
  gettedSetting: SettingsTable
  private errMessFeed: any
  showSpinner: boolean
  interni: any[] = []
  private unsubscribe$ = new Subject<void>()
  ids: any[] = []
  private isReady: boolean
  private arr: any[] = []

  constructor(
    private settingsTableService: SettingsTableService,
    private customerService: CustomerService
  ) {}

  getSettingsTable() {
    this.settingsTableService
      .getSettingsTable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (tables) => {
          this.gettedSetting = tables
          this.arr = Array.from(Array(this.gettedSetting.internal).keys())
          this.arr.forEach((el) => {
            this.interni.push({
              idx: el + 1,
            })
          })
        },
        (errmess) => {
          this.gettedSetting = null
          this.errMessFeed = errmess as any
        },
        () => {
          this.showSpinner = false
          this.getOpened()
        }
      )
  }

  ngOnInit(): void {
    this.getSettingsTable()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getOpened() {
    this.customerService
      .openedCustomerData('interno-')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          if (res && res.length > 0) {
            res.forEach((el) => {
              this.ids.push({ nTable: el.nTable, _id: el._id })
            })
          }
        },
        (err) => {},
        () => {
          this.isReady = true
        }
      )
  }

  getActived(s: string) {
    return this.ids.some((item) => item.nTable.includes(s))
    //return this.ids.includes(s)
  }
}
