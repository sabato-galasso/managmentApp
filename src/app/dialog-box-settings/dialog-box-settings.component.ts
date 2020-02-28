import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ItemMenu} from '../models/ItemMenu';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-settings',
  templateUrl: './dialog-box-settings.component.html',
  styleUrls: ['./dialog-box-settings.component.scss']
})
export class DialogBoxSettingsComponent implements OnInit {


  action: string;
  localData: any;

  catogories: any[] = [
    {value: 'super-alcolici', viewValue: 'Super Alcolici'},
    {value: 'bevande', viewValue: 'Bevande'},
    {value: 'birra', viewValue: 'Birra'},
    {value: 'cibi', viewValue: 'Cibi'},
    {value: 'vini', viewValue: 'Vini'},
  ];


  constructor(
    public dialogRef: MatDialogRef<DialogBoxSettingsComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ItemMenu) {
    this.localData = {...data};
    this.action = this.localData.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
  }

}
