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
  positionItem: any[] = []
  @Input() keyEl: number
  dragPosition = [{ x: 0, y: 0 }]
  disabled: boolean = true
  isReady = false

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
    this.dragPosition[0] = { x: 10, y: 20 }
    this.settingsTableService
      .getPositionTable('esterno_')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.positionItem = res
        },
        (error) => {},
        () => {
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
                      this.isReady = true
                    }
                  )
              }
            )
        }
      )
  }

  getActived(s: string) {
    return this.ids.includes(s)
  }

  enabled() {
    this.disabled = !this.disabled
  }

  getPosition(s: string) {
    return this.positionItem.find((item) => item.id == s)
  }
}
