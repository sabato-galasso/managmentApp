import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { SettingsTable } from '../../models/SettingsTable'
import { SettingsTableService } from '../../services/settings-table.service'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-internal-room',
  templateUrl: './internal-room.component.html',
  styleUrls: ['./internal-room.component.scss'],
})
export class InternalRoomComponent implements OnInit {
  private gettedSetting: SettingsTable
  private errMessFeed: any
  showSpinner: boolean
  private interni: number[]
  private unsubscribe$ = new Subject<void>()

  constructor(private settingsTableService: SettingsTableService) {}

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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
