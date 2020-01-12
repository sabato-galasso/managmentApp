import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModalContainerComponent} from '../modal-container/modal-container.component';
import {SettingsTableService} from '../services/settings-table.service';
import {SettingsTable} from '../models/SettingsTable';


export interface DialogData {
  animal: string;
  name: string;
  n_table: string;
  price: string;
}

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements OnInit, OnDestroy {


  seconds = '00';
  minutes = '00';
  hours = '00';
  price = '0.00';
  pphValue = 10.00;

  counter: number;
  timerRef: any;
  running = false;
  startText = 'Start';


  animal: string;
  name: string;

  showSpinner = false;
  gettedSetting: SettingsTable;
  errMessFeed: string;


  @Input() keyEl: string;

  constructor(public dialog: MatDialog, private settingsTableService: SettingsTableService) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(ModalContainerComponent, {
      height: '800px',
      data: {name: this.name, animal: this.animal, n_table: this.keyEl + 1, price: this.price}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.seconds = `0${Math.floor(this.counter / 1000) % 60}`.slice(-2);
        this.minutes = `0${Math.floor(this.counter / 60000) % 60}`.slice(-2);
        this.hours = `0${Math.floor(this.counter / 3600000)}`.slice(-2);
        this.price = this.stopwatchCalc(Math.floor(this.counter / 1000));
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = 0;
    this.price = '0.00';
    this.seconds = '00';
    this.minutes = '00';
    this.hours = '00';
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  stopwatchCalc(sec) {
    const pph = this.getFieldFloatValue();
    return this.round((pph * sec) / 3600, 2);
  }

  round(n, dec) {
    let x = n * Math.pow(10, dec);
    x = Math.round(x);
    return (x / Math.pow(10, dec)).toFixed(dec);
  }

  getFieldFloatValue() {
    if (this.pphValue) {
      const copyPriceToString = this.pphValue.toString();
      return parseFloat(copyPriceToString.replace(',', '.'));
    }
  }

  getSettingsTable() {
    this.settingsTableService.getSettingsTable().subscribe(tables => {
        this.gettedSetting = tables;
        this.pphValue = this.gettedSetting.price;
      },
      errmess => { this.gettedSetting = null; this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished', this.gettedSetting);  this.showSpinner = false; }
    );
  }

  ngOnInit(): void {
    this.getSettingsTable();
  }
}

