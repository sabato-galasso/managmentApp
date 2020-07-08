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
  interni: number[]
  private unsubscribe$ = new Subject<void>()
  selectedIndex: number[] = []

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
          this.interni = Array.from(Array(this.gettedSetting.internal).keys())
        },
        (errmess) => {
          this.gettedSetting = null
          this.errMessFeed = errmess as any
        },
        () => {
          this.showSpinner = false
        }
      )
  }

  ngOnInit(): void {
    this.getSettingsTable()
    this.getOpened()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getOpened() {
    this.customerService
      .openedCustomerData('interno-')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res && res.length > 0) {
          res.forEach((el) => {
            this.setSelected(el.nTable.split('-')[1])
          })
        }
      })
  }

  setSelected(id: number) {
    debugger
    this.selectedIndex.push(Number(id))
  }
}
