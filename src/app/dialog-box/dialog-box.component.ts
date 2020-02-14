// dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {WareHouse} from '../models/WareHouse';
import {CATEGORIES} from '../constants/categories';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  action: string;
  localData: any;
  warehouseItemForm: FormGroup;

  catogories: any[] = CATEGORIES;


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private fb: FormBuilder,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WareHouse) {
    this.localData = {...data};
    this.action = this.localData.action;
  }


  createForm(): void {
    this.warehouseItemForm = this.fb.group(
      {
        quantity: [0, [Validators.required, Validators.minLength(0)]],
        price: [0, [Validators.required]],
      }
    );
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
