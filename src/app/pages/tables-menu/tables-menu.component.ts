import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WebsocketService} from "../../services/socket.service";
import {CustomerTableModel} from "../../models/CustomerTableModel";

@Component({
  selector: 'app-tables-menu',
  templateUrl: './tables-menu.component.html',
  styleUrls: ['./tables-menu.component.scss']
})
export class TablesMenuComponent implements OnInit {

  paramId:string;
  customerTable: CustomerTableModel;
  constructor(private route: ActivatedRoute, private socketService: WebsocketService) {
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
  }

  catogories: any[] = [
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
        {value: 'super-alcolici', viewValue: 'Alcolici', children: 'alcolici','items': 1, 'level': 0},
        {value: 'panini', viewValue: 'Panini',children: 'panini','items': 1, 'level': 0}
      ],
    },

  ];

  closeTable() {

    this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });  }
}
