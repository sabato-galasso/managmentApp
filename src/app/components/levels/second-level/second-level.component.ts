import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../../../services/socket.service";
import {ActivatedRoute} from "@angular/router";
import {CustomerTableModel} from "../../../models/CustomerTableModel";
import {Location} from '@angular/common';
import {MenuManagerServiceService} from "../../../services/menu-manager-service.service";

@Component({
  selector: 'app-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.scss']
})
export class SecondLevelComponent implements OnInit {
  paramId: string;
  customerTable: CustomerTableModel;
  categories: any;
  private subcategory: string;
  firstLevel = [];
  constructor(private socketService: WebsocketService,
              private route: ActivatedRoute,
              private menuServices: MenuManagerServiceService,
              private location: Location) {
    this.paramId =  this.route.snapshot.params.id;
    this.subcategory =  this.route.snapshot.params.category;

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

    this.menuServices.getSubCategoriesNew(this.subcategory).subscribe(res => {
      console.log(res)
debugger
      this.firstLevel = res;


    })
  }

  closeTable() {

    this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });  }

  back() {
    this.location.back();
  }

}
