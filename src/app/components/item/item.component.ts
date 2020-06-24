import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageSharingService} from "../../services/message-sharing.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  counter = 0;

  @Output() valueChange = new EventEmitter();
  @Output() isActiveTableOutput: boolean;
  @Output() cons =  new EventEmitter();
  @Input() isActiveTable: boolean
  @Input() numberTable: boolean
  @Input() item: any;
  @Input() _id: string;

  constructor(private customerService: CustomerService,  private _route: ActivatedRoute,
              private _router: Router,
              private messageService: MessageSharingService
              ) {
  }

  ngOnInit(): void {}


  valueChanged(dataItem: any) {
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
    dataItem.quantity = 1;
    let data = {
      priceTable: 1,
      category: 'game',
      statusTable: 1,
      nTable: this.numberTable,
      consumazioni: [dataItem]
    }
    debugger
    if(this.isActiveTable){
      let data = {
        priceTable: 1,
        category: 'game',
        statusTable: 1,
        nTable: this.numberTable,
        consumazioni: [dataItem],
        _id: this._id
      }
      this.customerService.updateCustomerData(data).subscribe(res => {
        console.log(res)
        debugger
        this.isActiveTable = true
        this.messageService.updateId(res._id);
        this.messageService.updateTavoloAttivo(this.isActiveTable);
        this.messageService.updateConsumazioni(res);
      },error => {})
    }else{
      this.customerService.addNewCustomerData(data).subscribe(res => {
        console.log(res)
        debugger
        this.isActiveTable = true
        this.messageService.updateTavoloAttivo(this.isActiveTable);
        this.messageService.updateId(res._id);
        this.messageService.updateConsumazioni(res);
      })
    }
  }


}
