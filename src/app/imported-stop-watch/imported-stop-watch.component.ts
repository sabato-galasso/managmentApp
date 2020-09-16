import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-imported-stop-watch',
  templateUrl: './imported-stop-watch.component.html',
  styleUrls: ['./imported-stop-watch.component.scss'],
})
export class ImportedStopWatchComponent implements OnInit {
  seconds = '00'
  minutes = '00'
  hours = '00'
  price = '0.00'
  pphValue = 10.0

  counter: number
  timerRef: any
  running = false
  paused = false
  startText = 'Start'

  name: string

  showSpinner = false
  errMessFeed: string

  @Input() keyEl: number

  constructor() {}

  ngOnInit(): void {}

  startTimer() {
    this.running = !this.running
    this.paused = false
    if (this.running) {
      this.startText = 'Stop'
      const startTime = Date.now() - (this.counter || 0)
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime
        this.seconds = `0${Math.floor(this.counter / 1000) % 60}`.slice(-2)
        this.minutes = `0${Math.floor(this.counter / 60000) % 60}`.slice(-2)
        this.hours = `0${Math.floor(this.counter / 3600000)}`.slice(-2)
        this.price = this.stopwatchCalc(Math.floor(this.counter / 1000))
      })
    } else {
      this.startText = 'Resume'
      this.paused = true
      clearInterval(this.timerRef)
    }
  }

  clearTimer() {
    this.running = false
    this.startText = 'Start'
    this.counter = 0
    this.price = '0.00'
    this.seconds = '00'
    this.minutes = '00'
    this.hours = '00'
    clearInterval(this.timerRef)
  }

  ngOnDestroy() {
    clearInterval(this.timerRef)
  }

  stopwatchCalc(sec) {
    const pph = this.getFieldFloatValue()
    return this.round((pph * sec) / 3600, 2)
  }

  round(n, dec) {
    let x = n * Math.pow(10, dec)
    x = Math.round(x)
    return (x / Math.pow(10, dec)).toFixed(dec)
  }

  getFieldFloatValue() {
    if (this.pphValue) {
      const copyPriceToString = this.pphValue.toString()
      return parseFloat(copyPriceToString.replace(',', '.'))
    }
  }
}
