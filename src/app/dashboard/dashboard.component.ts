import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  userName: string;

  ngOnInit() {
    this.userName = localStorage.getItem('user');
  }

  logout() {
    this.auth.logout();
  }

}
