import { Component, OnInit } from '@angular/core';
import {Login} from '../models/Login';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseUrl';
import {catchError, tap} from 'rxjs/operators';
import {SettingsTableService} from '../services/settings-table.service';
import {FormGroup} from '@angular/forms';
import {SettingsTable} from '../models/SettingsTable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  errMessFeed: string;
  showSpinner = false;
  items: Array<number>;

  gettedSetting: SettingsTable;

  constructor(private settingsTableService: SettingsTableService) {
  }

  ngOnInit(): void {
    this.getSetting();
  }

  getSetting() {
    this.settingsTableService.getSettingsTable().subscribe(tables => {
        this.gettedSetting = tables;
        this.items = Array.from(Array(this.gettedSetting.quantity).keys());
      },
      errmess => { this.gettedSetting = null; this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished', this.gettedSetting);  this.showSpinner = false; }
    );
  }
}
