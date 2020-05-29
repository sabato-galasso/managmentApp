import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from "../../../services/socket.service";
import {CustomerTableModel} from "../../../models/CustomerTableModel";
import {ActivatedRoute} from "@angular/router";
import {WarehouseService} from "../../../services/warehouse.service";
import {MenuManagerServiceService} from "../../../services/menu-manager-service.service";

@Component({
  selector: 'app-item-level',
  templateUrl: './item-level.component.html',
  styleUrls: ['./item-level.component.scss']
})
export class ItemLevelComponent implements OnInit {

  paramId: string;
  customerTable: CustomerTableModel;
  private categorySlug: string;
  items = [];

  constructor(private socketService: WebsocketService,
              private route: ActivatedRoute,
              private warehouseService: WarehouseService,
              private menuService: MenuManagerServiceService,
              ) {
    this.paramId =  this.route.snapshot.params.id;
    this.categorySlug =  this.route.snapshot.params.category;

    this.customerTable = {
      status : 0,
      timer: '0',
      price: '0'
    }
  }

  ngOnInit(): void {

    this.socketService.getSocket(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });

    this.menuService.getMenuCategoryItems(this.categorySlug).subscribe(res => {
      console.log(res)
      this.items = res;
    })
  }

  closeTable() {

    this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });  }

}
