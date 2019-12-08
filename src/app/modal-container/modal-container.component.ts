import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../stop-watch/stop-watch.component';


@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent  {

  constructor(
    public dialogRef: MatDialogRef<ModalContainerComponent>,
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
