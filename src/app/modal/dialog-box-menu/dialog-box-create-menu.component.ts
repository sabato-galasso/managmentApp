// dialog-box-create-menu.component.ts
import {Component, Inject, OnDestroy, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MenuCategoryResponse} from "../../models/Menu/MenuCategoryResponse";
import {MatSelectChange} from "@angular/material/select";


@Component({
  selector: 'dialog-create-menu',
  templateUrl: './dialog-box-create-menu.component.html',
  styleUrls: ['./dialog-box-create-menu.component.scss']
})
export class DialogBoxCreateMenuComponent {

  action: string;
  localData: any;
  // Subsciptions
  private categories: MenuCategoryResponse[];
  private categories1: MenuCategoryResponse[];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxCreateMenuComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.localData = {};
if(data.action === 'Aggiungi'){
  this.categories = data.categories;
  this.categories1 = data.categories.filter(el => el.hasOwnProperty('slugCategoryFirst'));
}
    this.action = data.action;
  }


  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  doDeleteAction(){
    this.dialogRef.close({event: this.action, data: this.data});

  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  setValues($event: MatSelectChange, el : string) {

  if ($event.value && el === 'nameFirstLevel'){
      this.localData.nameFirstLevel = $event.value
    }else if ($event.value && el === 'category'){
      this.localData.nameCategory = $event.value
    }
  }
}
