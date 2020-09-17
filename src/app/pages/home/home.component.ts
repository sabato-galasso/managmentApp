import { Component, OnInit } from '@angular/core'
import { SettingsTableService } from '../../services/settings-table.service'
import { SettingsTable } from '../../models/SettingsTable'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  errMessFeed: string
  showSpinner = false
  items: Array<number>
  gettedSetting: SettingsTable
  private unsubscribe$ = new Subject<void>()

  constructor(private settingsTableService: SettingsTableService) {}

  ngOnInit(): void {
    this.getSetting()
    var script = document.createElement('script')
    script.src =
      'https://rawgit.com/paulirish/memory-stats.js/master/bookmarklet.js'
    document.head.appendChild(script)
  }

  getSetting() {
    this.settingsTableService
      .getSettingsTable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (tables) => {
          this.gettedSetting = tables
          this.items = Array.from(Array(this.gettedSetting.quantity).keys())
        },
        (errmess) => {
          this.gettedSetting = null
          this.errMessFeed = errmess as any
        },
        () => {
          console.log('Observable finished', this.gettedSetting)
          this.showSpinner = false
        }
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
