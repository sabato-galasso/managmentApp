import { Component, OnDestroy, OnInit } from '@angular/core'
import { SettingsTableService } from '../../services/settings-table.service'
import { SettingsTable } from '../../models/SettingsTable'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-external-room',
  templateUrl: './external-room.component.html',
  styleUrls: ['./external-room.component.scss'],
})
export class ExternalRoomComponent implements OnInit, OnDestroy {
  private gettedSetting: SettingsTable
  private errMessFeed: any
  showSpinner: boolean
  private copertiStruttura: number[]
  private copertiObrelloni: number[]
  private unsubscribe$ = new Subject<void>()

  constructor(private settingsTableService: SettingsTableService) {}

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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
