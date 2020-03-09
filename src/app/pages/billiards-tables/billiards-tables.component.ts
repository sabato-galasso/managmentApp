import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-billiards-tables',
  templateUrl: './billiards-tables.component.html',
  styleUrls: ['./billiards-tables.component.scss']
})
export class BilliardsTablesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirectTo(redirectPage: string) {
    this.router.navigate(['/'+redirectPage]);

  }
}
