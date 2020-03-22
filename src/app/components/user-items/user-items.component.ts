import {Component, Input, OnInit} from '@angular/core';
import {CustomerTableModel} from "../../models/CustomerTableModel";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  @Input() numberTable: string;
  @Input() customerTable: CustomerTableModel;

  constructor() {
    this.customerTable = {
      price: '0',
      timer: '0',
      status: 0
    }
  }

  ngOnInit(): void {
  }

}
