import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-spinner',
  templateUrl: './input-spinner.component.html',
  styleUrls: ['./input-spinner.component.scss']
})
export class InputSpinnerComponent  {

  @Input() data: any;
  @Input() rowValue: number;
  @Output() valueChange = new EventEmitter();


  incrementQuantity(data) {
    if (data.quantity === null || data.quantity < 0 || data.quantity === undefined || isNaN(data.quantity)) {
      this.rowValue = 0;
    } else {
      this.rowValue++;
    }
    this.valueChange.emit({quantity: this.rowValue, _id: this.data._id});

  }

  decrementQuantity(data) {
    if (data.quantity === null || data.quantity < 0 || data.quantity === undefined || isNaN(data.quantity)) {
      this.rowValue = 0;
    } else {
      this.rowValue--;
    }
    this.valueChange.emit({quantity: this.rowValue, _id: this.data._id});
  }

  disableIt(event) {
    const which = event.which;
    if (which === 38 || which === 40) {
      event.preventDefault();
    }
  }

  onChange(newData) {

    debugger;
    switch (newData) {
      case newData === null || newData === '' || newData === undefined || isNaN(newData):
        newData = this.data.quantity || 0;
        break;
        case newData < 0:
          newData = 0;
          break;
      case newData:
        // tslint:disable-next-line:radix
         newData = parseInt(newData);
         break;
      default:
        newData = 0;
        break;
    }

    this.valueChange.emit({quantity: newData, _id: this.data._id});
  }
}
