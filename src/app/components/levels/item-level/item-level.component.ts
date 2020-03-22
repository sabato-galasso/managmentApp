import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from "../../../services/socket.service";
import {CustomerTableModel} from "../../../models/CustomerTableModel";
import {ActivatedRoute} from "@angular/router";
import {WarehouseService} from "../../../services/warehouse.service";

@Component({
  selector: 'app-item-level',
  templateUrl: './item-level.component.html',
  styleUrls: ['./item-level.component.scss']
})
export class ItemLevelComponent implements OnInit {

  paramId: string;
  private categories: { firstLevel: ({ img: string; level: number; viewValue: string; value: string; items: number } | { img: string; level: number; viewValue: string; value: string; items: number } | { img: string; level: number; children: {}[]; viewValue: string; value: string; items: number } | { children: string; level: number; viewValue: string; value: string; items: number } | { children: string; level: number; viewValue: string; value: string; items: number })[] }[];
  customerTable: CustomerTableModel;
  private categoryName: string;
cat = [];

  constructor(private socketService: WebsocketService,private route: ActivatedRoute,private warehouseService: WarehouseService) {
    this.paramId =  this.route.snapshot.params.id;
    this.categoryName =  this.route.snapshot.params.category;

    this.customerTable = {
      status : 0,
      timer: '0',
      price: '0'
    }

    this.categories = [
      {

        firstLevel: [
          {
            value: 'bevande', viewValue: 'Bevande', img: '' ,'items': 1, 'level': 0
          },
          {
            value: 'cocktails', viewValue: 'Cocktails', img: '' ,'items': 1, 'level': 0
          },
          {value: 'birre', viewValue: 'Birre',img:'', 'items': 0, 'level': 1 ,children: [{

            }]},
          {value: 'alcolici', viewValue: 'Alcolici', children: 'alcolici','items': 1, 'level': 0},
          {value: 'panini', viewValue: 'Panini',children: 'panini','items': 1, 'level': 0}
        ],
      },

    ];
  }

  ngOnInit(): void {

    this.socketService.getSocket(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });

    this.warehouseService.getWareHouseCategory(this.categoryName).subscribe(res => {
      console.log(res)
      this.cat = res;
    })
  }

  closeTable() {

    this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });  }

}
