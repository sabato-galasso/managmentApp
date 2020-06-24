import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WebsocketService} from "../../services/socket.service";
import {CustomerTableModel} from "../../models/CustomerTableModel";
import {MenuManagerServiceService} from "../../services/menu-manager-service.service";
import {MenuResponse} from "../../models/Menu/MenuResponse";

@Component({
  selector: 'app-tables-menu',
  templateUrl: './tables-menu.component.html',
  styleUrls: ['./tables-menu.component.scss']
})
export class TablesMenuComponent implements OnInit {

  paramId:string;
  customerTable: CustomerTableModel;
  private menu: MenuResponse[];
  constructor(private route: ActivatedRoute, private socketService: WebsocketService,
              private menuService: MenuManagerServiceService) {
    this.paramId =  this.route.snapshot.params.id;

    this.customerTable = {
      price : '0',
      timer: '0',
      status: 0
    }
  }

  ngOnInit(): void {

    this.socketService.getSocket(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });

 /*   this.menuService.getMenu().subscribe(res => {

      this.menu = res
    })*/
    this.menuService.getCategories().subscribe(res => {

      this.menu = res
    })
  }

  closeTable() {

    this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });  }
}
