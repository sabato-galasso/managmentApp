import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate) {}

  title = 'managerAppFrontend'

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
  }
}
