// dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {WareHouse} from '../models/WareHouse';



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  action: string;
  localData: any;

  catogories: any[] = [
    {value: 'super-alcolici', viewValue: 'Super Alcolici'},
    {value: 'bevande', viewValue: 'Bevande'},
    {value: 'birra', viewValue: 'Birra'},
    {value: 'cibi', viewValue: 'Cibi'}
  ];


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WareHouse) {
    this.localData = {...data};
    this.action = this.localData.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
