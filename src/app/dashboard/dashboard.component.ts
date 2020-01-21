import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { version } from '../../../package.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  userName: string;
  versionApp: string;

  ngOnInit() {
    this.userName = localStorage.getItem('user');
    this.versionApp = version;
  }

  logout() {
    this.auth.logout();
  }

}
