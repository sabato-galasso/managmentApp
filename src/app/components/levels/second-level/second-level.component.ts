import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../../../services/socket.service";
import {ActivatedRoute} from "@angular/router";
import {CustomerTableModel} from "../../../models/CustomerTableModel";

@Component({
  selector: 'app-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.scss']
})
export class SecondLevelComponent implements OnInit {
  paramId: string;
  customerTable: CustomerTableModel;
  private categories: { firstLevel: ({ img: string; level: number; viewValue: string; value: string; items: number } | { img: string; level: number; viewValue: string; value: string; items: number } | { img: string; level: number; children: ({ children: string; level: number; viewValue: string; value: string; items: number } | { children: string; level: number; viewValue: string; value: string; items: number })[]; viewValue: string; value: string; items: number } | { children: string; level: number; viewValue: string; value: string; items: number } | { children: string; level: number; viewValue: string; value: string; items: number })[] }[];

  constructor(private socketService: WebsocketService,private route: ActivatedRoute) {
    this.paramId =  this.route.snapshot.params.id;

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
          {value: 'birre', viewValue: 'Birre',img:'', 'items': 0, 'level': 1 ,children: [
              {value: 'spina', viewValue: 'spina', children: 'spina','items': 1, 'level': 0},
              {value: 'bottiglia', viewValue: 'bottiglia',children: 'bottiglia','items': 1, 'level': 0}
            ]},
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
  }

  closeTable() {

    this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });  }

}
