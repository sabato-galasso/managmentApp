import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../stop-watch/stop-watch.component';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent  {

  constructor(
    public dialogRef: MatDialogRef<AddItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  typesOfShoes: string[] = ['Caffè', 'Birra', 'Loafers', 'Moccasins', 'Sneakers'];

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  enabled: boolean;

  onNoClick(): void {
    this.dialogRef.close();
  }

  test() {
    //alert('hi');
    this.enabled = false;
  }

  show() {
    this.enabled = true;
  }
}
