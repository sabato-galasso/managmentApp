import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../stop-watch/stop-watch.component';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})


export class ModalContainerComponent implements OnInit {

  message: string;
  color: string;

  constructor(
    public dialogRef: MatDialogRef<ModalContainerComponent>,
    public datas: DataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
   ) {}
  typesOfShoes: string[] = ['Caffè', 'Birra', 'Loafers', 'Moccasins', 'Sneakers'];
  catogories: any[] = [
    {value: '', viewValue: 'Tutto'},
    {value: 'super-alcolici', viewValue: 'Super Alcolici'},
    {value: 'bevande', viewValue: 'Bevande'},
    {value: 'birra', viewValue: 'Birra'},
    {value: 'cibi', viewValue: 'Cibi'}
  ];

  ngOnInit() {
    this.datas.currentMessage.subscribe(message => this.message = message);
  }

  newMessage() {
    this.datas.changeMessage('Hello from Sibling');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
