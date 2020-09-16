import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { SettingsTableService } from '../services/settings-table.service'
import { SettingsTable } from '../models/SettingsTable'
import { MatDialog } from '@angular/material/dialog'
import { CustomerService } from '../services/customer.service'
import { WebsocketService } from '../services/socket.service'
import { CustomerTableModel } from '../models/CustomerTableModel'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent implements OnInit, OnDestroy {
  seconds = '00'
  minutes = '00'
  hours = '00'
  price = '0.00'
  pphValue = 10.0

  counter: number
  timerRef: any
  running = false
  paused = false

  name: string

  showSpinner = false
  gettedSetting: SettingsTable
  errMessFeed: string

  @Input() keyEl: number
  customerTable: CustomerTableModel
  ids: string[] = []
  private unsubscribe$ = new Subject<void>()

  constructor(
    public dialog: MatDialog,
    private settingsTableService: SettingsTableService,
    private customerService: CustomerService
  ) {
    //Init model
    this.customerTable = {
      price: '0',
      timer: '0',
      status: 0,
      counter: 0,
    }
  }

  startTable() {
    if (!this.running) {
      this.startTimer()
    }
    this.running = !this.running
  }

  pauseTable() {
    this.paused = true
    this.running = false
    this.customerTable.isActive = false
    let tmp = JSON.parse(localStorage.getItem('ws' + this.keyEl.toString()))
    tmp.paused = true
    localStorage.setItem('ws' + this.keyEl.toString(), JSON.stringify(tmp))
    clearInterval(this.timerRef)
  }

  ngOnDestroy() {
    clearInterval(this.timerRef)
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getSettingsTable() {
    this.settingsTableService
      .getSettingsTable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (tables) => {
          this.gettedSetting = tables
          this.pphValue = this.gettedSetting.price
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
    if (localStorage.getItem('ws' + this.keyEl.toString())) {
      this.customerTable = JSON.parse(
        localStorage.getItem('ws' + this.keyEl.toString())
      )
      if (this.customerTable.isActive) {
        this.forceStartTimer(this.customerTable.startTime)
      }

      if (this.customerTable.paused) {
        this.paused = true
      }
    }
  }

  getOpened() {
    this.customerService
      .openedCustomerData('biliardi-')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res && res.length > 0) {
          res.forEach((el) => {
            this.ids.push(el.nTable)
          })
        }
      })
  }

  getActived(s: string) {
    return this.ids.includes(s)
  }

  forceStartTimer(startTime) {
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime
      this.seconds = `0${Math.floor(this.counter / 1000) % 60}`.slice(-2)
      this.minutes = `0${Math.floor(this.counter / 60000) % 60}`.slice(-2)
      this.hours = `0${Math.floor(this.counter / 3600000)}`.slice(-2)
      this.price = this.stopwatchCalc(Math.floor(this.counter / 1000))
      this.customerTable.isActive = true
      this.customerTable.price = this.price
      this.customerTable.timer =
        this.hours + ':' + this.minutes + ':' + this.seconds
      this.customerTable.paused = false
      localStorage.setItem(
        'ws' + this.keyEl.toString(),
        JSON.stringify(this.customerTable)
      )
    })
  }

  startTimer() {
    this.running = !this.running
    this.paused = false
    if (this.running) {
      const startTime = Date.now() - (this.counter || 0)
      this.customerTable.startTime = startTime
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime
        this.seconds = `0${Math.floor(this.counter / 1000) % 60}`.slice(-2)
        this.minutes = `0${Math.floor(this.counter / 60000) % 60}`.slice(-2)
        this.hours = `0${Math.floor(this.counter / 3600000)}`.slice(-2)
        this.price = this.stopwatchCalc(Math.floor(this.counter / 1000))
        this.customerTable.isActive = true
        this.customerTable.price = this.price
        this.customerTable.timer =
          this.hours + ':' + this.minutes + ':' + this.seconds
        localStorage.setItem(
          'ws' + this.keyEl.toString(),
          JSON.stringify(this.customerTable)
        )
      })
    } else {
      this.paused = true
      let tmp = JSON.parse(localStorage.getItem('ws' + this.keyEl.toString()))
      tmp.paused = true
      localStorage.setItem('ws' + this.keyEl.toString(), JSON.stringify(tmp))
      clearInterval(this.timerRef)
    }
  }

  clearTimer() {
    this.running = false
    this.customerTable.isActive = false
    this.customerTable.price = '0'
    this.customerTable.timer = '0:0:0'
    this.counter = 0
    this.price = '0.00'
    this.seconds = '00'
    this.minutes = '00'
    this.hours = '00'
    localStorage.removeItem('ws' + this.keyEl.toString())
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
