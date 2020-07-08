import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { SettingsTableService } from '../../services/settings-table.service'
import { SettingsTable } from '../../models/SettingsTable'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-external-room',
  templateUrl: './external-room.component.html',
  styleUrls: ['./external-room.component.scss'],
})
export class ExternalRoomComponent implements OnInit, OnDestroy {
  private gettedSetting: SettingsTable
  private errMessFeed: any
  showSpinner: boolean
  copertiStruttura: number[]
  copertiObrelloni: number[]
  private unsubscribe$ = new Subject<void>()
  ids: string[] = []
  @Input() keyEl: number

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
          this.copertiStruttura = Array.from(
            Array(this.gettedSetting.external_c).keys()
          )
          this.copertiObrelloni = Array.from(
            Array(this.gettedSetting.external_s).keys()
          )
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
      .openedCustomerData('esterno-ombrellone-')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          if (res && res.length > 0) {
            res.forEach((el) => {
              this.ids.push(el.nTable)
            })
          }
        },
        (error) => {},
        () => {
          this.customerService
            .openedCustomerData('esterno-pedana-')
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res) => {
              if (res && res.length > 0) {
                res.forEach((el) => {
                  this.ids.push(el.nTable)
                })
              }
            })
        }
      )
  }

  getActived(s: string) {
    return this.ids.includes(s)
  }
}
