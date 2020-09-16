import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { Observable, timer } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate) {}

  title = 'managerAppFrontend'
  private SLEEP_THRESHOLD = 1000

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (
          confirm("Nuova versione disponibile. Caricare l'ultima versione?")
        ) {
          window.location.reload()
        }
      })
    }

    let last = new Date().getTime()

    setInterval(function () {
      let current = new Date().getTime()
      if (current - last > 3000) {
        console.log('power was suspended')
        location.reload()
      }
      last = current
    }, 1000)
  }
}
