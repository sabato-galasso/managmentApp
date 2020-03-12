import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from '../stop-watch/stop-watch.component';
import {DataService} from '../services/data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
    ) {
    }

    catogories: any[] = [
        {
            value: 'super-alcolici', viewValue: 'Super Alcolici', children: [{
                spina: [{
                    piccola: [{
                        item1: '2'
                    }
                    ],
                    media: [{
                        item1: '2'

                    }
                    ],
                }

                ],
            }]
        },
        {value: 'bevande', viewValue: 'Bevande'},
        {value: 'birra', viewValue: 'Birra'},
        {value: 'cibi', viewValue: 'Cibi'}
    ];

    ngOnInit() {
        this.datas.currentMessage.subscribe(message => this.message = message);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
